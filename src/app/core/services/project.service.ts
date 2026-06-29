import { computed, Injectable, signal } from '@angular/core';

import { Project } from '../models';
import { MOCK_PROJECTS } from './mock-data/projects.mock';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly projectsState = signal<Project[]>(MOCK_PROJECTS);

  readonly projects = this.projectsState.asReadonly();
  readonly count = computed(() => this.projects().length);

  getById(id: string): Project | undefined {
    return this.projects().find((project) => project.id === id);
  }
}
