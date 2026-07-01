import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { DevBookProjectOverlay, DevBookSyncStatus } from '../models';
import {
  mergeParsedDevBookFiles,
  parseDevBookMarkdown,
  sortDevBookFileNames,
} from '../utils/devbook.parser';
import { API_CONFIG } from './api.config';
import { ProjectService } from './project.service';

interface GitHubContentItem {
  name: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

const RAW_CONTENT_HEADERS = new HttpHeaders({
  Accept: 'application/vnd.github.raw',
});

@Injectable({ providedIn: 'root' })
export class DevBookService {
  private readonly http = inject(HttpClient);
  private readonly projectService = inject(ProjectService);

  private readonly syncStatusState = signal<DevBookSyncStatus>({
    lastSyncAt: null,
    isSyncing: false,
    error: null,
    syncedCount: 0,
    missingCount: 0,
  });

  readonly syncStatus = this.syncStatusState.asReadonly();

  async syncFromProjects(): Promise<void> {
    if (this.syncStatusState().isSyncing) {
      return;
    }

    this.syncStatusState.update((status) => ({
      ...status,
      isSyncing: true,
      error: null,
    }));

    let syncedCount = 0;
    let missingCount = 0;
    let partialError: string | null = null;

    try {
      const projectsWithGithub = this.projectService
        .projects()
        .filter((project) => project.githubUrl);

      for (const project of projectsWithGithub) {
        const parsed = this.parseGithubUrl(project.githubUrl!);
        if (!parsed) {
          missingCount++;
          continue;
        }

        try {
          const overlay = await this.fetchDevBookOverlay(parsed.owner, parsed.repo);
          if (!overlay) {
            missingCount++;
            continue;
          }

          this.projectService.applyDevBookOverlay(project.id, overlay);
          syncedCount++;
        } catch {
          missingCount++;
          partialError = 'Synchronisation partielle — certains dépôts sont inaccessibles.';
        }
      }

      this.syncStatusState.set({
        lastSyncAt: new Date(),
        isSyncing: false,
        error: partialError,
        syncedCount,
        missingCount,
      });
    } catch {
      this.syncStatusState.set({
        lastSyncAt: new Date(),
        isSyncing: false,
        error: 'Échec de la synchronisation Dev Book.',
        syncedCount,
        missingCount,
      });
    }
  }

  private async fetchDevBookOverlay(
    owner: string,
    repo: string,
  ): Promise<Omit<DevBookProjectOverlay, 'devBookSyncedAt'> | null> {
    const folderUrl = `${API_CONFIG.githubApiUrl}/repos/${owner}/${repo}/contents/${API_CONFIG.devBookFolder}`;
    const listing = await firstValueFrom(this.http.get<GitHubContentItem[]>(folderUrl));

    const markdownFiles = listing
      .filter((item) => item.type === 'file' && item.name.endsWith('.md'))
      .map((item) => item.name);

    if (markdownFiles.length === 0) {
      return null;
    }

    const orderedNames = sortDevBookFileNames(markdownFiles);
    const parsedFiles = [];

    for (const fileName of orderedNames) {
      const content = await this.fetchMarkdownContent(owner, repo, fileName);
      if (content) {
        parsedFiles.push(parseDevBookMarkdown(fileName, content));
      }
    }

    if (parsedFiles.length === 0) {
      return null;
    }

    const merged = mergeParsedDevBookFiles(parsedFiles);
    const overlay: Omit<DevBookProjectOverlay, 'devBookSyncedAt'> = {};

    if (merged.frontmatter.description) {
      overlay.description = merged.frontmatter.description;
    }

    if (merged.frontmatter.demoUrl) {
      overlay.demoUrl = merged.frontmatter.demoUrl;
    }

    if (merged.frontmatter.technologies?.length) {
      overlay.technologies = merged.frontmatter.technologies;
    }

    if (merged.frontmatter.newTechnologies?.length) {
      overlay.newTechnologies = merged.frontmatter.newTechnologies;
    }

    if (merged.sections.length > 0) {
      overlay.sections = merged.sections;
    }

    if (merged.difficulties.length > 0) {
      overlay.difficulties = merged.difficulties;
    }

    if (merged.lessonsLearned.length > 0) {
      overlay.lessonsLearned = merged.lessonsLearned;
    }

    if (Object.keys(overlay).length === 0) {
      return null;
    }

    return overlay;
  }

  private async fetchMarkdownContent(
    owner: string,
    repo: string,
    fileName: string,
  ): Promise<string | null> {
    try {
      const fileUrl = `${API_CONFIG.githubApiUrl}/repos/${owner}/${repo}/contents/${API_CONFIG.devBookFolder}/${fileName}`;
      return await firstValueFrom(
        this.http.get(fileUrl, {
          responseType: 'text',
          headers: RAW_CONTENT_HEADERS,
        }),
      );
    } catch {
      return null;
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
