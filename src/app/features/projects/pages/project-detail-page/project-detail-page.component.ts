import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProjectService } from '../../../../core/services/project.service';
import { DevBookService } from '../../../../core/services/devbook.service';
import { DevBookTabsComponent } from '../../../../shared/components/devbook-tabs/devbook-tabs.component';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, MatIconModule, DevBookTabsComponent, TagListComponent, TimeAgoPipe],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly devBookService = inject(DevBookService);

  private readonly projectId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  readonly project = computed(() => {
    const id = this.projectId();
    this.projectService.projects();
    return id ? this.projectService.getById(id) : undefined;
  });

  readonly devBookSync = computed(() => {
    const id = this.projectId();
    if (!id) {
      return { isSyncing: false, error: null, disabled: false };
    }

    const projectState = this.devBookService.projectSyncStates()[id] ?? {
      isSyncing: false,
      error: null,
    };
    const bulkSyncing = this.devBookService.syncStatus().isSyncing;

    return {
      isSyncing: projectState.isSyncing,
      error: projectState.error,
      disabled: projectState.isSyncing || bulkSyncing,
    };
  });

  syncDevBook(): void {
    const id = this.projectId();
    if (id) {
      void this.devBookService.syncProject(id);
    }
  }
}
