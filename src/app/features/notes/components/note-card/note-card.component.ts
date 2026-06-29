import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Note } from '../../../../core/models';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-note-card',
  imports: [RouterLink, TagListComponent, TimeAgoPipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent {
  readonly note = input.required<Note>();
}
