import { computed, Injectable, signal } from '@angular/core';

import { Prompt, PromptCategory } from '../models';
import { MOCK_PROMPTS } from './mock-data/prompts.mock';

@Injectable({ providedIn: 'root' })
export class PromptService {
  private readonly promptsState = signal<Prompt[]>(MOCK_PROMPTS);

  readonly prompts = this.promptsState.asReadonly();
  readonly count = computed(() => this.prompts().length);

  readonly categories = computed(() => {
    const cats = new Set(this.prompts().map((p) => p.category));
    return Array.from(cats).sort() as PromptCategory[];
  });

  getById(id: string): Prompt | undefined {
    return this.prompts().find((prompt) => prompt.id === id);
  }

  getByCategory(category: PromptCategory | 'all'): Prompt[] {
    if (category === 'all') {
      return this.prompts();
    }
    return this.prompts().filter((prompt) => prompt.category === category);
  }
}
