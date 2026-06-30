import { computed, Injectable, signal } from '@angular/core';

import { Note } from '../models';
import { matchesTags } from '../utils/tag.utils';
import { MOCK_NOTES } from './mock-data/notes.mock';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly notesState = signal<Note[]>(MOCK_NOTES);

  readonly notes = this.notesState.asReadonly();
  readonly count = computed(() => this.notes().length);

  getById(id: string): Note | undefined {
    return this.notes().find((note) => note.id === id);
  }

  filterByTags(notes: Note[], selectedTags: string[]): Note[] {
    if (selectedTags.length === 0) {
      return notes;
    }
    return notes.filter((note) => matchesTags(note.tags, selectedTags));
  }
}
