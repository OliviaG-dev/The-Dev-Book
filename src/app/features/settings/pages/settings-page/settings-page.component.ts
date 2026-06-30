import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { GitHubService } from '../../../../core/services/github.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, MatIconModule, PageHeaderComponent, TimeAgoPipe],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private readonly githubService = inject(GitHubService);

  readonly repos = this.githubService.repos;
  readonly syncStatus = this.githubService.syncStatus;
  readonly aggregateStats = this.githubService.aggregateStats;

  syncGitHub(): void {
    void this.githubService.syncFromProjects();
  }
}
