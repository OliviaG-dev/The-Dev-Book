import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { TagCount } from '../../../core/services/tag.service';
import { normalizeTag } from '../../../core/utils/tag.utils';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrl: './tag-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagFilterComponent {
  readonly tags = input.required<TagCount[]>();
  readonly selectedTags = input.required<string[]>();

  readonly tagToggle = output<string>();
  readonly clearAll = output<void>();

  isSelected(tag: string): boolean {
    const normalized = normalizeTag(tag);
    return this.selectedTags().some((selected) => normalizeTag(selected) === normalized);
  }

  onToggle(tag: string): void {
    this.tagToggle.emit(tag);
  }

  onClearAll(): void {
    this.clearAll.emit();
  }
}
