## Angular 21 — standalone & architecture feature-based

### Pourquoi ce choix

Angular offre une structure opinionated (DI, routing, CLI) adaptée à une app qui va grossir (dashboard, CRUD, sync API). L'alternative React + librairies au choix convient aussi, mais ici l'objectif est d'**apprendre le framework Angular moderne** (v21) et ses conventions officielles.

### Première mise en place

```bash
ng new the-dev-book --style=scss --routing --ssr
```

Stack installée : Angular 21.2, TypeScript 5.9 strict, Angular Material, Vitest.

Configuration racine dans `src/app/app.config.ts` :

```typescript
providers: [
  provideRouter(routes, withComponentInputBinding()),
  provideAnimations(),
  provideHttpClient(withFetch()),
  provideClientHydration(withEventReplay()),
]
```

### Usage dans ce projet — structure

| Dossier | Responsabilité |
|---------|----------------|
| `core/models/` | Interfaces TypeScript (`Project`, `Prompt`, `Note`…) |
| `core/services/` | État et logique métier (`ProjectService`, `GitHubService`…) |
| `core/utils/` | Fonctions pures (parser Dev Book, filtres tags) |
| `shared/components/` | UI transverse (`PageHeader`, `TagList`, `SearchBar`) |
| `features/<domaine>/pages/` | Pages routées, une par écran |
| `layouts/main-layout/` | Sidebar + barre de recherche + `<router-outlet />` |

### Pattern composant standalone

Chaque composant déclare ses dépendances dans `imports` — pas de module parent :

```typescript
@Component({
  selector: 'app-projects-list-page',
  imports: [PageHeaderComponent, ProjectCardComponent, TagFilterComponent],
  templateUrl: './projects-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPageComponent {
  private readonly projectService = inject(ProjectService);
  // ...
}
```

**`inject()`** remplace le constructeur pour récupérer les services — pattern recommandé en Angular récent.

### Routing et lazy loading

`src/app/app.routes.ts` : une route parente `MainLayoutComponent` avec des enfants lazy :

```typescript
{
  path: 'projects',
  loadComponent: () =>
    import('./features/projects/pages/projects-list-page/...').then(
      (m) => m.ProjectsListPageComponent,
    ),
}
```

Avantages constatés :

- Bundle initial plus léger
- Séparation nette par feature
- Chaque page = un chunk distinct dans le build Vite/esbuild

### Services comme couche d'état

Exemple `ProjectService` :

- `signal<Project[]>` privé
- `readonly projects = this.projectsState.asReadonly()` exposé aux composants
- `computed()` pour les dérivés (`count`)

Les pages **ne mutent pas** directement les données : elles appellent des méthodes service (`applyDevBookOverlay`, `filterByTags`).

### Pièges rencontrés

- Oublier `ChangeDetectionStrategy.OnPush` sur un nouveau composant → rerenders inutiles (corrigé : OnPush sur 100 % des composants)
- Mélanger logique de filtrage dans le template au lieu d'un `computed()` → code difficile à relire
- `provideAnimations()` requis pour Material même si on n'utilise que les icônes

### Ce que j'ai retenu

- **Une feature = un dossier** avec `pages/` + `components/` locaux
- Les composants `shared/` restent présentationnels (inputs `input()`, pas de HTTP)
- Le CLI Angular (`ng generate component`) respecte le préfixe `app` défini dans `angular.json`

### Ressources

- [Angular standalone components](https://angular.dev/guide/components/importing)
- [Angular dependency injection](https://angular.dev/guide/di)
- [Angular routing](https://angular.dev/guide/routing)
