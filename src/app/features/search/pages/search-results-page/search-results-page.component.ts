import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { SearchService } from '../../../../core/services/search.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TagListComponent } from '../../../../shared/components/tag-list/tag-list.component';

@Component({
  selector: 'app-search-results-page',
  imports: [
    RouterLink,
    MatIconModule,
    PageHeaderComponent,
    EmptyStateComponent,
    TagListComponent,
  ],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);

  private readonly queryParam = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('q') ?? '')),
    { initialValue: '' },
  );

  readonly query = this.searchService.query;
  readonly results = this.searchService.results;

  readonly typeLabels: Record<string, string> = {
    project: 'Projet',
    prompt: 'Prompt',
    note: 'Note',
  };

  readonly typeIcons: Record<string, string> = {
    project: 'folder',
    prompt: 'auto_awesome',
    note: 'note',
  };

  constructor() {
    effect(() => {
      this.searchService.setQuery(this.queryParam());
    });
  }
}
