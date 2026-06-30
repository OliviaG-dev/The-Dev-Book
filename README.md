# The Dev Book

Bibliothèque vivante pour développeur — un mélange entre Notion, Obsidian et un portfolio technique.

Centralise vos projets, documentation, prompts IA, notes d'apprentissage et (à terme) vos données GitHub.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-21-1976D2?style=for-the-badge&logo=materialdesignicons&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Signals](https://img.shields.io/badge/Signals-reactive-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![SSR](https://img.shields.io/badge/SSR-Angular%20Universal-0F172A?style=for-the-badge&logo=angular&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-planned-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub%20API-sync-181717?style=for-the-badge&logo=github&logoColor=white)
![CI](https://github.com/OliviaG-dev/The-Dev-Book/actions/workflows/ci.yml/badge.svg)

## Vision

The Dev Book est une application web personnelle pensée comme :

- un **portfolio développeur** structuré ;
- une **base de connaissances** pour consolider l'apprentissage ;
- une **bibliothèque de prompts IA** réutilisables ;
- un projet **pédagogique Angular** démontrant une architecture professionnelle.

## Stack technique

### Frontend (actuel)

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white)
![Standalone Components](https://img.shields.io/badge/Standalone%20Components-enabled-0F172A?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-21-1976D2?style=flat-square&logo=materialdesignicons&logoColor=white)
![Angular Router](https://img.shields.io/badge/Angular%20Router-lazy%20loading-DD0031?style=flat-square&logo=angular&logoColor=white)
![Signals](https://img.shields.io/badge/Angular%20Signals-reactive-DD0031?style=flat-square&logo=angular&logoColor=white)
![SSR](https://img.shields.io/badge/SSR-Angular%20Universal-0F172A?style=flat-square&logo=angular&logoColor=white)

### Backend (prévu)

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)

### Intégrations futures

![GitHub API](https://img.shields.io/badge/GitHub%20API-sync-181717?style=flat-square&logo=github&logoColor=white)
![PDF](https://img.shields.io/badge/PDF-export-E5252A?style=flat-square&logo=adobeacrobatreader&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-planned-6366F1?style=flat-square&logo=auth0&logoColor=white)
![Cloud Sync](https://img.shields.io/badge/Cloud%20Sync-planned-0EA5E9?style=flat-square&logo=icloud&logoColor=white)

## Fonctionnalités

### V1 — En place

| Section | Description |
|---------|-------------|
| **Dashboard** | Compteurs (projets, prompts, notes) et dernières modifications |
| **Projects** | Liste et fiches détail (stack, difficultés, leçons apprises, sections) |
| **Prompts** | Bibliothèque filtrable par catégorie (Cursor, Angular, Playwright, CI/CD…) |
| **Notes** | Base de connaissances personnelle avec tags |
| **Settings** | Configuration et synchronisation GitHub |

### V2 — En place

| Fonctionnalité | Description |
|----------------|-------------|
| **Recherche globale** | Barre de recherche dans le layout + page `/search?q=…` |
| **Filtres par tags** | Chips cliquables sur Projects, Prompts et Notes |
| **Sync GitHub** | Récupération des stats repos via l'API GitHub (Settings + Dashboard) |

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
│   ├── models/       # Project, Prompt, Note, SearchResult, GitHub…
│   └── services/     # Services Signals + Search, Tag, GitHub
├── shared/
│   ├── components/   # StatCard, PageHeader, TagList, SearchBar, TagFilter…
│   └── pipes/        # TimeAgoPipe
├── features/
│   ├── dashboard/
│   ├── projects/
│   ├── prompts/
│   ├── notes/
│   ├── search/
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

### CI (GitHub Actions)

Le workflow `.github/workflows/ci.yml` s'exécute sur chaque **push** et **pull request** vers `main` / `master` :

1. `npm ci`
2. `npm run build`
3. `npm test -- --watch=false`

![CI](https://github.com/OliviaG-dev/The-Dev-Book/actions/workflows/ci.yml/badge.svg)

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
| `/search?q=…` | Résultats de recherche globale |
| `/settings` | Sync GitHub et paramètres |

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
