## Angular SSR (Server-Side Rendering)

### Pourquoi ce choix

SSR améliore le premier affichage et prépare un déploiement Node/Express. Angular 21 intègre `@angular/ssr` avec **prerender** et **rendu serveur hybride** — plus simple que l'ancien Universal séparé.

### Première mise en place

Activé à la génération du projet (`--ssr`). Fichiers clés :

| Fichier | Rôle |
|---------|------|
| `src/main.server.ts` | Bootstrap serveur |
| `src/server.ts` | Handler Express |
| `src/app/app.config.server.ts` | Providers SSR |
| `src/app/app.routes.server.ts` | Mode de rendu par route |

Build production :

```bash
npm run build
npm run serve:ssr:the-dev-book
```

### Usage dans ce projet — modes de rendu

`app.routes.server.ts` :

```typescript
export const serverRoutes: ServerRoute[] = [
  { path: 'dashboard', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'projects/:id', renderMode: RenderMode.Server },
  { path: 'search', renderMode: RenderMode.Server },
  // ...
];
```

- **Prerender** : pages listes statiques (HTML généré au build)
- **Server** : pages dynamiques (`:id`, recherche avec `?q=`)

`angular.json` : SSR activé uniquement en configuration **production** ; `ng serve` en dev reste client-only.

### Hydration

`provideClientHydration(withEventReplay())` dans `app.config.ts` :

- Le HTML serveur est « réactivé » côté client
- `withEventReplay()` conserve les clics saisis avant la fin du chargement JS

### Garde navigateur obligatoire

`ProjectService` persiste les overlays Dev Book dans `localStorage` :

```typescript
private loadOverlaysFromStorage(): Record<string, DevBookProjectOverlay> {
  if (!isPlatformBrowser(this.platformId)) {
    return {};
  }
  // localStorage.getItem(...)
}
```

Sans cette garde → erreur `localStorage is not defined` au prerender.

`PLATFORM_ID` injecté via `inject(PLATFORM_ID)`.

### Pièges rencontrés

- Appeler `localStorage` ou `window` dans un service sans garde → crash SSR
- Confondre prerender et SSR dynamique : les routes `:id` ne sont pas dans le HTML initial au build
- Oublier `provideServerRendering(withRoutes(serverRoutes))` dans `app.config.server.ts`

### Ce que j'ai retenu

- Tout code **browser-only** doit passer par `isPlatformBrowser`
- Choisir le `RenderMode` route par route selon le contenu dynamique
- Tester le build SSR avant de déployer (`serve:ssr:the-dev-book`)

### Ressources

- [Angular SSR guide](https://angular.dev/guide/ssr)
- [Hydration](https://angular.dev/guide/hydration)
