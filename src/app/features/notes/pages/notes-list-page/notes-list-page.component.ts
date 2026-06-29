import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NoteService } from '../../../../core/services/note.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { NoteCardComponent } from '../../components/note-card/note-card.component';

@Component({
  selector: 'app-notes-list-page',
  imports: [PageHeaderComponent, NoteCardComponent, EmptyStateComponent],
  templateUrl: './notes-list-page.component.html',
  styleUrl: './notes-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListPageComponent {
  private readonly noteService = inject(NoteService);

  readonly notes = this.noteService.notes;
}
