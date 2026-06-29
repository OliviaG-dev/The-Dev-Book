import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { PromptCategory } from '../../../../core/models';
import { PromptService } from '../../../../core/services/prompt.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PromptCardComponent } from '../../components/prompt-card/prompt-card.component';

@Component({
  selector: 'app-prompts-list-page',
  imports: [PageHeaderComponent, PromptCardComponent, EmptyStateComponent],
  templateUrl: './prompts-list-page.component.html',
  styleUrl: './prompts-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptsListPageComponent {
  private readonly promptService = inject(PromptService);

  readonly categories = this.promptService.categories;
  readonly selectedCategory = signal<PromptCategory | 'all'>('all');

  readonly filteredPrompts = computed(() =>
    this.promptService.getByCategory(this.selectedCategory()),
  );

  selectCategory(category: PromptCategory | 'all'): void {
    this.selectedCategory.set(category);
  }
}
