import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NoteService } from '../../../../core/services/note.service';
import { TagService } from '../../../../core/services/tag.service';
import { toggleTagSelection } from '../../../../core/utils/tag-selection.utils';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TagFilterComponent } from '../../../../shared/components/tag-filter/tag-filter.component';
import { NoteCardComponent } from '../../components/note-card/note-card.component';

@Component({
  selector: 'app-notes-list-page',
  imports: [PageHeaderComponent, NoteCardComponent, EmptyStateComponent, TagFilterComponent],
  templateUrl: './notes-list-page.component.html',
  styleUrl: './notes-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListPageComponent {
  private readonly noteService = inject(NoteService);
  private readonly tagService = inject(TagService);

  readonly noteTags = this.tagService.noteTags;
  readonly selectedTags = signal<string[]>([]);

  readonly filteredNotes = computed(() =>
    this.noteService.filterByTags(this.noteService.notes(), this.selectedTags()),
  );

  onTagToggle(tag: string): void {
    this.selectedTags.update((tags) => toggleTagSelection(tags, tag));
  }

  onClearTags(): void {
    this.selectedTags.set([]);
  }
}
