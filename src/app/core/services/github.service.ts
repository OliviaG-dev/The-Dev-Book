import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { GitHubAggregateStats, GitHubRepoStats, GitHubSyncStatus } from '../models';
import { API_CONFIG } from './api.config';
import { MOCK_GITHUB_REPOS } from './mock-data/github.mock';
import { ProjectService } from './project.service';

interface GitHubApiRepoResponse {
  name: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly projectService = inject(ProjectService);

  private readonly reposState = signal<GitHubRepoStats[]>(MOCK_GITHUB_REPOS);
  private readonly syncStatusState = signal<GitHubSyncStatus>({
    lastSyncAt: null,
    isSyncing: false,
    error: null,
  });

  readonly repos = this.reposState.asReadonly();
  readonly syncStatus = this.syncStatusState.asReadonly();

  readonly aggregateStats = computed<GitHubAggregateStats>(() => {
    const repos = this.repos();
    return {
      reposCount: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
      totalOpenIssues: repos.reduce((sum, repo) => sum + repo.openIssues, 0),
    };
  });

  async syncFromProjects(): Promise<void> {
    if (this.syncStatusState().isSyncing) {
      return;
    }

    this.syncStatusState.update((status) => ({
      ...status,
      isSyncing: true,
      error: null,
    }));

    try {
      const projectsWithGithub = this.projectService
        .projects()
        .filter((project) => project.githubUrl);

      const syncedRepos: GitHubRepoStats[] = [];

      for (const project of projectsWithGithub) {
        const parsed = this.parseGithubUrl(project.githubUrl!);
        if (!parsed) {
          continue;
        }

        const repo = await this.fetchRepoStats(project.id, parsed.owner, parsed.repo);
        if (repo) {
          syncedRepos.push(repo);
        }
      }

      if (syncedRepos.length === 0) {
        this.reposState.set(MOCK_GITHUB_REPOS);
      } else {
        this.reposState.set(syncedRepos);
      }

      this.syncStatusState.set({
        lastSyncAt: new Date(),
        isSyncing: false,
        error: null,
      });
    } catch {
      this.reposState.set(MOCK_GITHUB_REPOS);
      this.syncStatusState.set({
        lastSyncAt: new Date(),
        isSyncing: false,
        error: 'Synchronisation partielle — données mockées utilisées.',
      });
    }
  }

  getRepoByProjectId(projectId: string): GitHubRepoStats | undefined {
    return this.repos().find((repo) => repo.projectId === projectId);
  }

  private async fetchRepoStats(
    projectId: string,
    owner: string,
    repo: string,
  ): Promise<GitHubRepoStats | null> {
    try {
      const url = `${API_CONFIG.githubApiUrl}/repos/${owner}/${repo}`;
      const response = await firstValueFrom(
        this.http.get<GitHubApiRepoResponse>(url),
      );

      return {
        id: projectId,
        projectId,
        name: response.name,
        fullName: response.full_name,
        url: response.html_url,
        stars: response.stargazers_count,
        forks: response.forks_count,
        openIssues: response.open_issues_count,
        language: response.language,
        updatedAt: new Date(response.updated_at),
      };
    } catch {
      const fallback = MOCK_GITHUB_REPOS.find((item) => item.projectId === projectId);
      return fallback ?? null;
    }
  }

  private parseGithubUrl(url: string): { owner: string; repo: string } | null {
    const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
    if (!match) {
      return null;
    }

    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ''),
    };
  }
}
