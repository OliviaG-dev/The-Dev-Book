import { computed, Injectable, signal } from '@angular/core';

import { SearchResult } from '../models';
import { extractExcerpt, normalizeTag } from '../utils/tag.utils';
import { NoteService } from './note.service';
import { ProjectService } from './project.service';
import { PromptService } from './prompt.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly query = signal('');

  readonly results = computed(() => this.search(this.query()));

  constructor(
    private readonly projectService: ProjectService,
    private readonly promptService: PromptService,
    private readonly noteService: NoteService,
  ) {}

  setQuery(value: string): void {
    this.query.set(value.trim());
  }

  search(query: string): SearchResult[] {
    const term = query.trim().toLowerCase();
    if (!term) {
      return [];
    }

    const projectResults: SearchResult[] = this.projectService
      .projects()
      .filter((project) => this.matchesProject(project, term))
      .map((project) => ({
        id: project.id,
        type: 'project',
        title: project.name,
        excerpt: extractExcerpt(project.description),
        route: `/projects/${project.id}`,
        tags: project.technologies,
      }));

    const promptResults: SearchResult[] = this.promptService
      .prompts()
      .filter((prompt) => this.matchesPrompt(prompt, term))
      .map((prompt) => ({
        id: prompt.id,
        type: 'prompt',
        title: prompt.title,
        excerpt: extractExcerpt(prompt.description || prompt.content),
        route: `/prompts/${prompt.id}`,
        tags: [...prompt.tags, prompt.category],
      }));

    const noteResults: SearchResult[] = this.noteService
      .notes()
      .filter((note) => this.matchesNote(note, term))
      .map((note) => ({
        id: note.id,
        type: 'note',
        title: note.title,
        excerpt: extractExcerpt(note.content),
        route: `/notes/${note.id}`,
        tags: note.tags,
      }));

    return [...projectResults, ...promptResults, ...noteResults];
  }

  private matchesProject(
    project: {
      name: string;
      description: string;
      technologies: string[];
      difficulties: string[];
      lessonsLearned: string[];
    },
    term: string,
  ): boolean {
    return (
      this.includesTerm(project.name, term) ||
      this.includesTerm(project.description, term) ||
      project.technologies.some((tag) => this.includesTerm(tag, term)) ||
      project.difficulties.some((item) => this.includesTerm(item, term)) ||
      project.lessonsLearned.some((item) => this.includesTerm(item, term))
    );
  }

  private matchesPrompt(
    prompt: {
      title: string;
      description: string;
      content: string;
      category: string;
      tags: string[];
    },
    term: string,
  ): boolean {
    return (
      this.includesTerm(prompt.title, term) ||
      this.includesTerm(prompt.description, term) ||
      this.includesTerm(prompt.content, term) ||
      this.includesTerm(prompt.category, term) ||
      prompt.tags.some((tag) => this.includesTerm(tag, term))
    );
  }

  private matchesNote(
    note: { title: string; content: string; tags: string[] },
    term: string,
  ): boolean {
    return (
      this.includesTerm(note.title, term) ||
      this.includesTerm(note.content, term) ||
      note.tags.some((tag) => this.includesTerm(tag, term))
    );
  }

  private includesTerm(value: string, term: string): boolean {
    return normalizeTag(value).includes(normalizeTag(term));
  }
}
