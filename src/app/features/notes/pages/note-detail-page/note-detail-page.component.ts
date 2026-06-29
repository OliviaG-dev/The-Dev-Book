import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { NoteService } from '../../../../core/services/note.service';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-note-detail-page',
  imports: [RouterLink, MatIconModule, TagListComponent, TimeAgoPipe],
  templateUrl: './note-detail-page.component.html',
  styleUrl: './note-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly noteService = inject(NoteService);

  private readonly noteId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  readonly note = computed(() => {
    const id = this.noteId();
    return id ? this.noteService.getById(id) : undefined;
  });
}
