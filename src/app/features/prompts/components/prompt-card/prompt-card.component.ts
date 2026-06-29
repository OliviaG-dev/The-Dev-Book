import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Prompt } from '../../../../core/models';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-prompt-card',
  imports: [RouterLink, TagListComponent, TimeAgoPipe],
  templateUrl: './prompt-card.component.html',
  styleUrl: './prompt-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptCardComponent {
  readonly prompt = input.required<Prompt>();
}
