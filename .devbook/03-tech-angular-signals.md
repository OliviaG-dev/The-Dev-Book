## Angular Signals

### Pourquoi ce choix

Signals est la primitive réactive moderne d'Angular (depuis v16+, mature en v21). Elle remplace progressivement les patterns « tout en RxJS + async pipe » pour l'état synchrone UI. Ici, **pas de NgRx** : les services exposent des signals suffisent pour l'échelle actuelle.

### Première mise en place

Imports depuis `@angular/core` :

```typescript
import { signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
```

### Usage dans ce projet

#### 1. État global dans les services

```typescript
// ProjectService — pattern répété dans PromptService, NoteService, SearchService…
private readonly projectsState = signal<Project[]>(MOCK_PROJECTS);
readonly projects = this.projectsState.asReadonly();
readonly count = computed(() => this.projects().length);
```

`asReadonly()` empêche les composants de modifier le signal à la source.

#### 2. État local UI sur les pages

`ProjectsListPageComponent` :

```typescript
readonly selectedTags = signal<string[]>([]);

readonly filteredProjects = computed(() =>
  this.projectService.filterByTags(
    this.projectService.projects(),
    this.selectedTags(),
  ),
);

onTagToggle(tag: string): void {
  this.selectedTags.update((tags) => toggleTagSelection(tags, tag));
}
```

Le template consomme `filteredProjects()` — pas de subscription manuelle.

#### 3. Pont RxJS → Signal (routes)

Les paramètres de route restent des Observables ; `toSignal` fait le pont :

```typescript
private readonly projectId = toSignal(
  this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
  { initialValue: '' },
);

readonly project = computed(() =>
  this.projectService.getById(this.projectId()),
);
```

#### 4. Inputs composants (signal inputs)

`TagListComponent` :

```typescript
readonly tags = input.required<string[]>();
readonly size = input<'sm' | 'md'>('sm');
readonly variant = input<'default' | 'accent'>('default');
```

Plus besoin de `@Input()` décorateur — API plus cohérente avec le reste.

#### 5. Sync GitHub / Dev Book

`GitHubService` et `DevBookService` utilisent `signal` pour `syncStatus` (loading, erreur, compteurs). Les pages Settings lisent `devBookSyncStatus()` directement.

### Signals vs RxJS — règle pratique adoptée

| Cas | Outil |
|-----|-------|
| État applicatif synchrone | `signal` + `computed` |
| Params / query route | `toSignal(route.paramMap)` |
| Appel HTTP ponctuel | `async/await` + `firstValueFrom()` |
| Flux temps réel long | RxJS (pas encore utilisé ici) |

### Pièges rencontrés

- Lire un signal sans `()` dans le template ou le TypeScript → valeur non réactive
- Muter un tableau dans un signal au lieu d'utiliser `.update()` ou `.set()` → change detection ne voit pas le changement
- `computed()` avec effets de bord → interdit ; utiliser `effect()` à la place (ex. `SearchBarComponent` pour synchroniser la query)

### Ce que j'ai retenu

- Commencer par modéliser l'état en **signals dans le service**, pas dans le composant
- `computed()` pour tout ce qui est dérivé (filtres, agrégats dashboard, recherche)
- Exposer uniquement des signaux readonly aux consommateurs

### Ressources

- [Angular Signals guide](https://angular.dev/guide/signals)
- [RxJS interop](https://angular.dev/guide/signals/rxjs-interop)
