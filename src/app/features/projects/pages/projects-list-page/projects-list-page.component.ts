import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ProjectService } from '../../../../core/services/project.service';
import { TagService } from '../../../../core/services/tag.service';
import { toggleTagSelection } from '../../../../core/utils/tag-selection.utils';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TagFilterComponent } from '../../../../shared/components/tag-filter/tag-filter.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-projects-list-page',
  imports: [
    PageHeaderComponent,
    ProjectCardComponent,
    EmptyStateComponent,
    TagFilterComponent,
  ],
  templateUrl: './projects-list-page.component.html',
  styleUrl: './projects-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPageComponent {
  private readonly projectService = inject(ProjectService);
  private readonly tagService = inject(TagService);

  readonly projectTags = this.tagService.projectTags;
  readonly selectedTags = signal<string[]>([]);

  readonly filteredProjects = computed(() =>
    this.projectService.filterByTags(this.projectService.projects(), this.selectedTags()),
  );

  onTagToggle(tag: string): void {
    this.selectedTags.update((tags) => toggleTagSelection(tags, tag));
  }

  onClearTags(): void {
    this.selectedTags.set([]);
  }
}
