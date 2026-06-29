import { computed, Injectable } from '@angular/core';

import { ActivityItem } from '../models';
import { NoteService } from './note.service';
import { ProjectService } from './project.service';
import { PromptService } from './prompt.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  readonly stats = computed(() => ({
    projectsCount: this.projectService.count(),
    promptsCount: this.promptService.count(),
    notesCount: this.noteService.count(),
  }));

  readonly recentActivity = computed<ActivityItem[]>(() => {
    const items: ActivityItem[] = [
      ...this.projectService.projects().map((project) => ({
        id: project.id,
        type: 'project' as const,
        title: project.name,
        updatedAt: project.updatedAt,
        route: `/projects/${project.id}`,
      })),
      ...this.promptService.prompts().map((prompt) => ({
        id: prompt.id,
        type: 'prompt' as const,
        title: prompt.title,
        updatedAt: prompt.updatedAt,
        route: `/prompts/${prompt.id}`,
      })),
      ...this.noteService.notes().map((note) => ({
        id: note.id,
        type: 'note' as const,
        title: note.title,
        updatedAt: note.updatedAt,
        route: `/notes/${note.id}`,
      })),
    ];

    return items
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 8);
  });

  constructor(
    private readonly projectService: ProjectService,
    private readonly promptService: PromptService,
    private readonly noteService: NoteService,
  ) {}
}
