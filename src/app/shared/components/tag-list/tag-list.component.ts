import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  readonly tags = input.required<string[]>();
  readonly size = input<'sm' | 'md'>('sm');
}
