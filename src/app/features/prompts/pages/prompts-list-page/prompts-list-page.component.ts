import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { PromptCategory } from '../../../../core/models';
import { PromptService } from '../../../../core/services/prompt.service';
import { TagService } from '../../../../core/services/tag.service';
import { toggleTagSelection } from '../../../../core/utils/tag-selection.utils';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TagFilterComponent } from '../../../../shared/components/tag-filter/tag-filter.component';
import { PromptCardComponent } from '../../components/prompt-card/prompt-card.component';

@Component({
  selector: 'app-prompts-list-page',
  imports: [
    PageHeaderComponent,
    PromptCardComponent,
    EmptyStateComponent,
    TagFilterComponent,
  ],
  templateUrl: './prompts-list-page.component.html',
  styleUrl: './prompts-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptsListPageComponent {
  private readonly promptService = inject(PromptService);
  private readonly tagService = inject(TagService);

  readonly categories = this.promptService.categories;
  readonly promptTags = this.tagService.promptTags;
  readonly selectedCategory = signal<PromptCategory | 'all'>('all');
  readonly selectedTags = signal<string[]>([]);

  readonly filteredPrompts = computed(() => {
    const byCategory = this.promptService.getByCategory(this.selectedCategory());
    return this.promptService.filterByTags(byCategory, this.selectedTags());
  });

  selectCategory(category: PromptCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  onTagToggle(tag: string): void {
    this.selectedTags.update((tags) => toggleTagSelection(tags, tag));
  }

  onClearTags(): void {
    this.selectedTags.set([]);
  }
}
