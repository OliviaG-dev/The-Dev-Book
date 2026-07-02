---
id: dev-book
name: The Dev Book
description: Application portfolio et base de connaissances — apprentissage d'Angular 21 (standalone, Signals, SSR) en architecture feature-based.
technologies: [Angular, TypeScript, SCSS, Angular Material, Signals, RxJS, Vitest, Express, SSR]
newTechnologies: [Angular Signals, Angular SSR, Vitest]
githubUrl: https://github.com/OliviaG-dev/The-Dev-Book
demoUrl:
---

## Contexte

The Dev Book est une application personnelle qui centralise projets, prompts IA, notes et synchronisation GitHub. Le projet sert aussi de **bac à sable pédagogique** pour monter en compétence sur **Angular 21** avec une architecture proche d'un produit réel (pas un tutoriel todo-list).

Au départ, j'avais une base React/TypeScript solide ; Angular impose un autre modèle mental : **injection de dépendances**, **templates déclaratifs**, **change detection** et désormais **Signals** comme primitive d'état.

## Nouvelles technologies — vue d'ensemble

| Techno | Déjà connue ? | Rôle dans le projet |
|--------|---------------|---------------------|
| Angular 21 | Partiel | Framework principal, composants standalone, routing lazy |
| Angular Signals | Non | État réactif dans les services et pages (remplace une grande partie des subscriptions) |
| Angular SSR | Non | Prerender des listes, rendu serveur des pages dynamiques, hydration |
| Vitest | Partiel (hors Angular) | Tests unitaires via `@angular/build:unit-test` |
| Angular Material | Partiel | Icônes et tooltips uniquement — UI custom en SCSS |

## Architecture Angular retenue

```
src/app/
├── core/          # Modèles, services (Signals), utils purs
├── shared/        # Composants et pipes réutilisables
├── features/      # Un dossier par domaine (dashboard, projects…)
└── layouts/       # Coque persistante (sidebar + router-outlet)
```

Principes clés :

- **Zéro NgModule** — tout est standalone
- **OnPush partout** — performance par défaut
- **État dans les services** — les pages lisent des `signal` / `computed` exposés en lecture seule
- **Lazy loading** — chaque page feature est chargée à la demande via `loadComponent`

## Difficultés liées aux nouvelles technos

- Choisir quand utiliser **Signals** vs **RxJS** (`toSignal` pour les params de route, pas de store global)
- Comprendre le **cycle SSR** : `localStorage` et APIs navigateur interdits côté serveur sans garde `isPlatformBrowser`
- Configurer **prerender vs server** route par route (`app.routes.server.ts`)
- Imports relatifs profonds (`../../../../core/...`) — pas d'alias `@/` configuré pour l'instant

## Leçons apprises

- Placer la logique métier dans des **services injectables** garde les composants fins et testables
- `computed()` pour dériver des listes filtrées évite de dupliquer l'état (ex. `ProjectsListPageComponent`)
- `provideHttpClient(withFetch())` simplifie les appels GitHub sans zone.js fetch polyfill
- Un parser markdown pur (`devbook.parser.ts`) sans dépendance externe reste facile à tester avec Vitest

## Prochaines explorations

- Brancher un backend Express + PostgreSQL (remplacer les mocks)
- OAuth GitHub pour dépasser le rate limit API
- Tests composants sur les pages critiques (filtres, sync Settings)
- Alias TypeScript `@app/core` pour alléger les imports
