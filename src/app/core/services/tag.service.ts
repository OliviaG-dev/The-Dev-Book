import { computed, Injectable } from '@angular/core';

import { normalizeTag } from '../utils/tag.utils';
import { NoteService } from './note.service';
import { ProjectService } from './project.service';
import { PromptService } from './prompt.service';

export interface TagCount {
  label: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class TagService {
  readonly allTags = computed<TagCount[]>(() => {
    const counts = new Map<string, number>();

    for (const project of this.projectService.projects()) {
      for (const tag of project.technologies) {
        this.incrementTag(counts, tag);
      }
    }

    for (const prompt of this.promptService.prompts()) {
      for (const tag of prompt.tags) {
        this.incrementTag(counts, tag);
      }
    }

    for (const note of this.noteService.notes()) {
      for (const tag of note.tags) {
        this.incrementTag(counts, tag);
      }
    }

    return this.toSortedTagCounts(counts);
  });

  readonly projectTags = computed<TagCount[]>(() => {
    const counts = new Map<string, number>();
    for (const project of this.projectService.projects()) {
      for (const tag of project.technologies) {
        this.incrementTag(counts, tag);
      }
    }
    return this.toSortedTagCounts(counts);
  });

  readonly promptTags = computed<TagCount[]>(() => {
    const counts = new Map<string, number>();
    for (const prompt of this.promptService.prompts()) {
      for (const tag of prompt.tags) {
        this.incrementTag(counts, tag);
      }
    }
    return this.toSortedTagCounts(counts);
  });

  readonly noteTags = computed<TagCount[]>(() => {
    const counts = new Map<string, number>();
    for (const note of this.noteService.notes()) {
      for (const tag of note.tags) {
        this.incrementTag(counts, tag);
      }
    }
    return this.toSortedTagCounts(counts);
  });

  constructor(
    private readonly projectService: ProjectService,
    private readonly promptService: PromptService,
    private readonly noteService: NoteService,
  ) {}

  private incrementTag(counts: Map<string, number>, tag: string): void {
    const key = normalizeTag(tag);
    if (!key) {
      return;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  private toSortedTagCounts(counts: Map<string, number>): TagCount[] {
    return Array.from(counts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }
}
