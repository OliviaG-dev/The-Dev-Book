import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { DashboardService } from '../../../../core/services/dashboard.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink,
    MatIconModule,
    PageHeaderComponent,
    StatCardComponent,
    TimeAgoPipe,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly stats = this.dashboardService.stats;
  readonly recentActivity = this.dashboardService.recentActivity;

  readonly activityIcons: Record<string, string> = {
    project: 'folder',
    prompt: 'auto_awesome',
    note: 'note',
  };

  readonly activityLabels: Record<string, string> = {
    project: 'Projet',
    prompt: 'Prompt',
    note: 'Note',
  };
}
