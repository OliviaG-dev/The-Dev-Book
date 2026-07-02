## Documentation Dev Book — le dossier `.devbook/`

### Pourquoi ce format existe

Chaque projet portfolio a besoin de **deux niveaux de doc** :

| Besoin | Fichier adapté |
|--------|----------------|
| Présenter le produit (install, scripts, badges) | `README.md` à la racine |
| Capturer **l'apprentissage technique** (nouvelles technos, pièges, leçons) | `.devbook/` |

Le README reste public et générique. Le dossier `.devbook/` vit **dans le repo GitHub** du projet et alimente **The Dev Book** via synchronisation — une seule source de vérité, versionnée avec le code.

### Mise en place dans The Dev Book (Option C)

L'app ne scanne pas tout le profil GitHub : elle lit le dossier `.devbook/` **de chaque repo** lié par `githubUrl` sur la fiche projet.

**Flux :**

1. Settings → **Sync contenu Dev Book**
2. `DevBookService` appelle `GET /repos/{owner}/{repo}/contents/.devbook`
3. Téléchargement de chaque fichier `*.md` (API GitHub, header `Accept: application/vnd.github.raw`)
4. Parsing markdown + YAML (`devbook.parser.ts`)
5. Fusion des contenus → overlay appliqué au projet (`ProjectService`)
6. Persistance navigateur : `localStorage` clé `the-dev-book:devbook-overlays`

**Priorité d'affichage (sync + UI) :**

1. Fichiers `02-tech-*.md` (une techno nouvelle par fichier)
2. Autres fichiers `.md` (comme celui-ci)
3. `index.md` en dernier (métadonnées + vue d'ensemble)

### Structure du dossier

```
.devbook/
├── index.md                 # obligatoire — YAML + synthèse projet
├── 02-tech-<nom>.md         # une techno nouvelle significative
├── 03-tech-<nom>.md
├── 06-documentation-….md    # sujets transverses (optionnel)
└── …
```

**Règles de nommage :**

- Préfixe numérique pour l'ordre (`02-`, `03-`…)
- Fichiers techno : `02-tech-playwright.md`, `03-tech-supabase-auth.md`
- Pas de brouillons (`draft.md`, notes vrac)
- Dossier **`.devbook/`** uniquement (pas `DevBook/`)

### Format `index.md`

Bloc YAML en tête (frontmatter) :

```markdown
---
id: slug-kebab-case
name: Nom du projet
description: Une phrase — accent apprentissage
technologies: [React, TypeScript, Playwright]
newTechnologies: [Playwright, OpenAI]
githubUrl: https://github.com/OliviaG-dev/Mon-Repo
demoUrl: https://…
---
```

Sections `##` reconnues par le parser :

| Section (titre contenant…) | Destination dans l'app |
|----------------------------|-------------------------|
| `## Difficultés…` | `difficulties[]` |
| `## Leçons apprises` | `lessonsLearned[]` |
| Autres `##` | `sections[]` dans l'onglet index |

Le champ **`newTechnologies`** met en avant les tags « Nouvelles technologies » sur la fiche projet (variante accent).

### Format `02-tech-*.md`

Un fichier = **une techno nouvelle** documentée en profondeur :

- Pourquoi ce choix
- Première mise en place
- Usage concret dans le repo (fichiers, dossiers)
- Pièges rencontrés
- Ce que j'ai retenu
- Ressources

Le premier `## Titre` devient le titre de section ; le contenu peut inclure `###`, listes, tableaux et blocs de code (rendus en HTML dans l'app).

### Rendu dans l'application

Sur `/projects/:id`, si un sync Dev Book a eu lieu :

- **Onglets** par fichier `.md` (`DevBookTabsComponent`)
- **Markdown stylé** : code, tableaux, listes (`devbook-markdown.pipe.ts` + `markdown.renderer.ts`)
- Badge **Tech** sur les onglets `02-tech-*`
- Difficultés et leçons en blocs séparés sous les onglets

### Rule Cursor globale

Une rule Cursor (`devbook-documentation.mdc`, `alwaysApply: true`) :

- Propose le format `.devbook/` quand on demande une doc sans préciser
- Scaffolde `index.md` + fichiers `02-tech-*` pour les technos nouvelles
- Rédige en français, factuel, sans `TODO` ni sections vides

### Workflow recommandé

1. Créer ou compléter `.devbook/` dans le repo du projet
2. Commiter et pousser sur GitHub
3. Sur la fiche projet (`/projects/:id`) → **Sync .devbook** (un seul dépôt, peu coûteux en appels API)
4. Ou dans Settings → **Sync contenu Dev Book** pour tous les projets d'un coup
5. Vérifier la fiche projet (onglets, tags, sections)

Pour **The Dev Book lui-même**, le dossier `.devbook/` est dans ce repo — la sync lit `OliviaG-dev/The-Dev-Book` comme n'importe quel autre projet.

### Pièges rencontrés

- **Rate limit GitHub** (~60 req/h sans token) — sync partielle sur 26 projets
- **SSR** : pas d'accès `localStorage` côté serveur → overlays chargés uniquement dans le navigateur (`isPlatformBrowser`)
- Anciens overlays sans `devBookDocuments` → re-sync nécessaire après ajout des onglets
- Le parser YAML est volontairement **minimal** (pas de lib externe) — tableaux sur une ligne uniquement : `[A, B, C]`

### Ce que j'ai retenu

- Versionner la doc d'apprentissage **avec le code** évite la dérive README / portfolio
- Séparer **fichiers techno** et **index** garde les fiches lisibles (onglets + priorité tech)
- Parser pur + tests Vitest = sync fiable sans dépendance markdown lourde
- Rule Cursor + question format doc = workflow reproductible sur tous les repos portfolio

### Ressources

- Rule projet : `devbook-documentation.mdc` (Cursor global)
- Code sync : `src/app/core/services/devbook.service.ts`
- Parser : `src/app/core/utils/devbook.parser.ts`
- [GitHub Contents API](https://docs.github.com/en/rest/repos/contents)
