import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { DevBookProjectOverlay, Project } from '../models';
import { matchesTags } from '../utils/tag.utils';
import { MOCK_PROJECTS } from './mock-data/projects.mock';

const DEVBOOK_STORAGE_KEY = 'the-dev-book:devbook-overlays';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly devBookOverlaysState = signal<Record<string, DevBookProjectOverlay>>({});
  private readonly projectsState = signal<Project[]>(MOCK_PROJECTS);

  readonly projects = this.projectsState.asReadonly();
  readonly count = computed(() => this.projects().length);

  constructor() {
    const overlays = this.loadOverlaysFromStorage();
    this.devBookOverlaysState.set(overlays);
    this.projectsState.set(this.mergeProjectsWithOverlays(MOCK_PROJECTS, overlays));
  }

  getById(id: string): Project | undefined {
    return this.projects().find((project) => project.id === id);
  }

  filterByTags(projects: Project[], selectedTags: string[]): Project[] {
    if (selectedTags.length === 0) {
      return projects;
    }
    return projects.filter((project) => matchesTags(project.technologies, selectedTags));
  }

  applyDevBookOverlay(
    projectId: string,
    overlay: Omit<DevBookProjectOverlay, 'devBookSyncedAt'>,
  ): void {
    const syncedAt = new Date().toISOString();
    const storedOverlay: DevBookProjectOverlay = {
      ...overlay,
      devBookSyncedAt: syncedAt,
    };

    const overlays = {
      ...this.devBookOverlaysState(),
      [projectId]: storedOverlay,
    };

    this.devBookOverlaysState.set(overlays);
    this.persistOverlays(overlays);
    this.projectsState.set(
      this.mergeProjectsWithOverlays(MOCK_PROJECTS, overlays),
    );
  }

  private loadOverlaysFromStorage(): Record<string, DevBookProjectOverlay> {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }

    try {
      const raw = localStorage.getItem(DEVBOOK_STORAGE_KEY);
      if (!raw) {
        return {};
      }

      const parsed = JSON.parse(raw) as Record<string, DevBookProjectOverlay>;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  private persistOverlays(overlays: Record<string, DevBookProjectOverlay>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(DEVBOOK_STORAGE_KEY, JSON.stringify(overlays));
  }

  private mergeProjectsWithOverlays(
    projects: Project[],
    overlays: Record<string, DevBookProjectOverlay>,
  ): Project[] {
    return projects.map((project) => {
      const overlay = overlays[project.id];
      if (!overlay) {
        return project;
      }

      return this.mergeProjectWithOverlay(project, overlay);
    });
  }

  private mergeProjectWithOverlay(
    project: Project,
    overlay: DevBookProjectOverlay,
  ): Project {
    const syncedAt = new Date(overlay.devBookSyncedAt);

    return {
      ...project,
      ...(overlay.description ? { description: overlay.description } : {}),
      ...(overlay.demoUrl ? { demoUrl: overlay.demoUrl } : {}),
      ...(overlay.newTechnologies?.length
        ? { newTechnologies: overlay.newTechnologies }
        : {}),
      ...(overlay.technologies?.length
        ? {
            technologies: this.uniqueStrings([
              ...project.technologies,
              ...overlay.technologies,
            ]),
          }
        : {}),
      ...(overlay.sections?.length ? { sections: overlay.sections } : {}),
      ...(overlay.devBookDocuments?.length
        ? { devBookDocuments: overlay.devBookDocuments }
        : {}),
      ...(overlay.difficulties?.length ? { difficulties: overlay.difficulties } : {}),
      ...(overlay.lessonsLearned?.length
        ? { lessonsLearned: overlay.lessonsLearned }
        : {}),
      devBookSyncedAt: syncedAt,
      updatedAt: syncedAt,
    };
  }

  private uniqueStrings(values: string[]): string[] {
    return [...new Set(values)];
  }
}
