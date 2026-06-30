import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search-bar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly query = this.searchService.query;
  readonly results = this.searchService.results;
  readonly isOpen = signal(false);

  readonly typeLabels: Record<string, string> = {
    project: 'Projet',
    prompt: 'Prompt',
    note: 'Note',
  };

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setQuery(value);
    this.isOpen.set(value.trim().length > 0);
  }

  onFocus(): void {
    if (this.query().length > 0) {
      this.isOpen.set(true);
    }
  }

  onBlur(): void {
    setTimeout(() => this.isOpen.set(false), 150);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const term = this.query().trim();
    if (!term) {
      return;
    }
    this.isOpen.set(false);
    void this.router.navigate(['/search'], { queryParams: { q: term } });
  }

  clear(): void {
    this.searchService.setQuery('');
    this.isOpen.set(false);
    this.inputRef()?.nativeElement.focus();
  }
}
