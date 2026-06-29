import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { PromptService } from '../../../../core/services/prompt.service';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-prompt-detail-page',
  imports: [RouterLink, MatIconModule, TagListComponent, TimeAgoPipe],
  templateUrl: './prompt-detail-page.component.html',
  styleUrl: './prompt-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly promptService = inject(PromptService);

  private readonly promptId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  readonly prompt = computed(() => {
    const id = this.promptId();
    return id ? this.promptService.getById(id) : undefined;
  });
}
