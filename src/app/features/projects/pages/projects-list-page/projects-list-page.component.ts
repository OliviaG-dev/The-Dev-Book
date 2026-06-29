import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProjectService } from '../../../../core/services/project.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-projects-list-page',
  imports: [PageHeaderComponent, ProjectCardComponent, EmptyStateComponent],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPageComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = this.projectService.projects;
}
