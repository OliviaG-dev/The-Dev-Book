# The Dev Book

Bibliothèque vivante pour développeur — un mélange entre Notion, Obsidian et un portfolio technique.

Centralise vos projets, documentation, prompts IA, notes d'apprentissage et (à terme) vos données GitHub.

## Vision

The Dev Book est une application web personnelle pensée comme :

- un **portfolio développeur** structuré ;
- une **base de connaissances** pour consolider l'apprentissage ;
- une **bibliothèque de prompts IA** réutilisables ;
- un projet **pédagogique Angular** démontrant une architecture professionnelle.

## Stack technique

### Frontend (actuel)

- Angular 21 — Standalone Components
- TypeScript
- SCSS
- Angular Material
- Angular Router
- Angular Signals
- SSR (Angular Universal)

### Backend (prévu)

- Node.js
- Express
- PostgreSQL

### Intégrations futures

- GitHub API
- Génération PDF
- Authentification
- Synchronisation Cloud

## Fonctionnalités

### V1 — En place

| Section | Description |
|---------|-------------|
| **Dashboard** | Compteurs (projets, prompts, notes) et dernières modifications |
| **Projects** | Liste et fiches détail (stack, difficultés, leçons apprises, sections) |
| **Prompts** | Bibliothèque filtrable par catégorie (Cursor, Angular, Playwright, CI/CD…) |
| **Notes** | Base de connaissances personnelle avec tags |
| **Settings** | Placeholder pour les futures options |

### V2 — Prévu

- Synchronisation GitHub
- Statistiques des repositories
- Recherche globale
- Filtres et tags avancés

### V3 — Prévu

- Éditeur Markdown
- Historique des modifications
- Favoris
- Organisation avancée des contenus

### V4 — Prévu

- Authentification
- Génération PDF
- Export Markdown
- Synchronisation Cloud

## Architecture

```
src/app/
├── core/
│   ├── models/       # Project, Prompt, Note, ActivityItem
│   └── services/     # Services avec Signals + données mockées
├── shared/
│   ├── components/   # StatCard, PageHeader, TagList, EmptyState
│   └── pipes/        # TimeAgoPipe
├── features/
│   ├── dashboard/
│   ├── projects/
│   ├── prompts/
│   ├── notes/
│   └── settings/
└── layouts/
    └── main-layout/  # Sidebar + zone de contenu
```

### Conventions

- Composants **standalone** uniquement
- État réactif via **Signals** dans les services
- **Lazy loading** des pages feature
- Données mockées en attendant le backend (`API_CONFIG` prêt pour les appels HTTP)
- Design sombre inspiré de Notion, Obsidian, Linear et GitHub

## Démarrage

### Prérequis

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Serveur de développement

```bash
npm start
```

Ouvrir [http://localhost:4200](http://localhost:4200). L'application se recharge automatiquement à chaque modification.

### Build production

```bash
npm run build
```

Les artefacts sont générés dans `dist/the-dev-book/`.

### Tests unitaires

```bash
npm test
```

## Routes

| Route | Page |
|-------|------|
| `/dashboard` | Vue d'ensemble |
| `/projects` | Liste des projets |
| `/projects/:id` | Détail d'un projet |
| `/prompts` | Bibliothèque de prompts |
| `/prompts/:id` | Détail d'un prompt |
| `/notes` | Liste des notes |
| `/notes/:id` | Détail d'une note |
| `/settings` | Paramètres (placeholder) |

## Objectifs pédagogiques

Ce projet permet de pratiquer :

- Composants Angular standalone
- Routing et lazy loading
- Services et injection de dépendances
- Signals et état réactif
- Angular Material
- Architecture feature-based
- Préparation à une connexion API backend

## Ressources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io)
