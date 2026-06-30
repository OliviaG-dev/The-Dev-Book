# Contributing

## Git workflow

Ce dépôt suit le workflow **branche feature → PR → merge** (règle globale Cursor `git-pr-cleanup-workflow`).

### Étapes

1. Partir de `master` à jour : `git pull origin master`
2. Créer une branche :
   - `feat/<description>` — fonctionnalité
   - `fix/<description>` — correction
   - `chore/<description>` — CI, docs, config
3. Commiter sur la branche (format : `✨ feat: short description in English`)
4. Pousser : `git push -u origin HEAD`
5. Ouvrir une PR vers `master` : `gh pr create`
6. Attendre la CI verte, merger sur GitHub
7. Après merge : `go cleanup` dans Cursor pour supprimer la branche locale/distante

### Interdit par défaut

- Push direct sur `master`
- Merge local sur `master` sans PR

Exceptions uniquement sur demande explicite (hotfix urgent, etc.).

## CI

Chaque PR doit passer le workflow **Build & Test** (`.github/workflows/ci.yml`) :

- `npm ci`
- `npm run build`
- `npm test -- --watch=false`

## Protection de branche

La branche `master` est protégée sur GitHub :

- Pull request obligatoire avant merge
- Status check **Build & Test** requis
