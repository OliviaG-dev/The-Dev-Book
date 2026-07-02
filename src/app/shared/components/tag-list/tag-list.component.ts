import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { getTagChipStyle } from '../../../core/utils/tag-color.utils';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  readonly tags = input.required<string[]>();
  readonly size = input<'sm' | 'md'>('sm');
  readonly variant = input<'default' | 'accent'>('default');

  chipStyle(tag: string): Record<string, string> {
    return getTagChipStyle(tag);
  }
}
