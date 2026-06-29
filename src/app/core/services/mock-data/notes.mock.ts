import { Note } from '../../models';

const MOCK_NOTES: Note[] = [
  {
    id: 'angular-lifecycle',
    title: 'Cycle de vie Angular',
    content: `## Hooks principaux

- **ngOnInit** : initialisation après création des inputs
- **ngOnChanges** : réaction aux changements d'inputs
- **ngOnDestroy** : nettoyage (subscriptions, timers)

## Avec Signals

Les computed signals remplacent souvent ngOnChanges pour dériver l'état.
Les effects remplacent certains cas d'usage de ngOnInit + subscribe.`,
    tags: ['angular', 'lifecycle', 'signals'],
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-06-15'),
  },
  {
    id: 'rxjs-basics',
    title: 'RxJS — Opérateurs essentiels',
    content: `## Opérateurs fréquents

- **map** : transformer chaque valeur
- **filter** : filtrer le flux
- **switchMap** : annuler la requête précédente
- **catchError** : gérer les erreurs
- **debounceTime** : limiter les émissions rapides

## Quand utiliser RxJS vs Signals

Signals : état local, dérivations synchrones.
RxJS : flux asynchrones, événements, HTTP (via HttpClient).`,
    tags: ['rxjs', 'observables', 'operators'],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-05-20'),
  },
  {
    id: 'docker-basics',
    title: 'Docker — Commandes utiles',
    content: `## Commandes de base

\`\`\`bash
docker build -t myapp .
docker run -p 3000:3000 myapp
docker compose up -d
docker compose down
\`\`\`

## Bonnes pratiques

- Multi-stage builds pour réduire la taille des images
- .dockerignore pour exclure node_modules
- Variables d'environnement via docker-compose`,
    tags: ['docker', 'devops', 'containers'],
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-04-01'),
  },
  {
    id: 'microservices',
    title: 'Architecture Microservices',
    content: `## Principes

- Services indépendants et déployables séparément
- Communication via API REST ou message broker
- Base de données par service (pas de DB partagée)

## Trade-offs

+ Scalabilité, résilience, équipes autonomes
- Complexité opérationnelle, latence réseau, transactions distribuées`,
    tags: ['architecture', 'microservices', 'backend'],
    createdAt: new Date('2026-04-20'),
    updatedAt: new Date('2026-06-25'),
  },
];

export { MOCK_NOTES };
