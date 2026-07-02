## Vitest (tests Angular)

### Pourquoi ce choix

Angular 17+ supporte Vitest nativement via `@angular/build:unit-test` — plus rapide que Karma/Jasmine pour des tests unitaires ciblés. Déjà familier avec Vitest côté React, l'adapter au contexte Angular était l'étape suivante.

### Première mise en place

`angular.json` :

```json
"test": {
  "builder": "@angular/build:unit-test"
}
```

`tsconfig.spec.json` : `"types": ["vitest/globals"]`

Lancement :

```bash
npm test
# CI : npm test -- --watch=false
```

### Usage dans ce projet

#### Test smoke application

`src/app/app.spec.ts` — vérifie que `App` se crée via TestBed :

```typescript
await TestBed.configureTestingModule({
  imports: [App],
  providers: [provideRouter([])],
}).compileComponents();
```

#### Tests purs (sans DOM Angular)

`src/app/core/utils/devbook.parser.spec.ts` — tests du parser markdown Dev Book :

```typescript
import { describe, expect, it } from 'vitest';

it('sorts tech files before other docs and index last', () => {
  expect(sortDevBookFileNames([...])).toEqual([...]);
});
```

Approche retenue : **tester la logique pure** en priorité (parser, utils tags) — ratio effort/couverture optimal.

### Pièges rencontrés

- `ng test --run` n'est pas reconnu — utiliser `npm test` ou `--watch=false` en CI
- Mélanger syntaxe Jasmine (`jasmine.createSpy`) et Vitest → rester sur `vi.fn()` / `describe` Vitest

### Ce que j'ai retenu

- Extraire la logique testable hors des composants (utils, parsers)
- La CI GitHub Actions exécute build + test à chaque PR
- Étendre progressivement vers les services (`DevBookService` mock HTTP)

### Ressources

- [Angular testing with Vitest](https://angular.dev/guide/testing)
- [Vitest documentation](https://vitest.dev)
