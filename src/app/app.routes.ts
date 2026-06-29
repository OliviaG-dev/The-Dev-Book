import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(
            (m) => m.DashboardPageComponent,
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/pages/projects-list-page/projects-list-page.component').then(
            (m) => m.ProjectsListPageComponent,
          ),
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/projects/pages/project-detail-page/project-detail-page.component').then(
            (m) => m.ProjectDetailPageComponent,
          ),
      },
      {
        path: 'prompts',
        loadComponent: () =>
          import('./features/prompts/pages/prompts-list-page/prompts-list-page.component').then(
            (m) => m.PromptsListPageComponent,
          ),
      },
      {
        path: 'prompts/:id',
        loadComponent: () =>
          import('./features/prompts/pages/prompt-detail-page/prompt-detail-page.component').then(
            (m) => m.PromptDetailPageComponent,
          ),
      },
      {
        path: 'notes',
        loadComponent: () =>
          import('./features/notes/pages/notes-list-page/notes-list-page.component').then(
            (m) => m.NotesListPageComponent,
          ),
      },
      {
        path: 'notes/:id',
        loadComponent: () =>
          import('./features/notes/pages/note-detail-page/note-detail-page.component').then(
            (m) => m.NoteDetailPageComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/pages/settings-page/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
