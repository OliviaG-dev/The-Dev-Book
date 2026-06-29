import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'dashboard', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'projects/:id', renderMode: RenderMode.Server },
  { path: 'prompts', renderMode: RenderMode.Prerender },
  { path: 'prompts/:id', renderMode: RenderMode.Server },
  { path: 'notes', renderMode: RenderMode.Prerender },
  { path: 'notes/:id', renderMode: RenderMode.Server },
  { path: 'settings', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
