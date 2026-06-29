import { Project } from '../../models';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'tarotmind',
    name: 'TarotMind',
    description:
      'Application de tirage de tarot assistée par IA, avec historique des lectures et interprétations personnalisées.',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Playwright'],
    difficulties: [
      'Gestion du streaming des réponses IA côté frontend',
      'Configuration CI/CD avec tests E2E Playwright',
      'Modélisation des relations entre cartes et interprétations',
    ],
    lessonsLearned: [
      'Structurer les services Angular autour de Signals pour un état réactif simple',
      'Isoler la logique métier dans des services testables',
      'Automatiser les tests E2E dès le début du projet',
    ],
    githubUrl: 'https://github.com/example/tarotmind',
    demoUrl: 'https://tarotmind.example.com',
    screenshotUrls: [],
    sections: [
      {
        title: 'Présentation',
        content:
          'TarotMind permet aux utilisateurs de réaliser des tirages de tarot et d\'obtenir des interprétations enrichies par IA, tout en conservant un historique personnel.',
      },
      {
        title: 'Architecture',
        content:
          'Architecture en couches : composants standalone Angular, services métier, API REST Express, base PostgreSQL. Séparation claire entre présentation et logique.',
      },
      {
        title: 'Stack technique',
        content:
          'Frontend Angular 21 avec Signals, backend Node.js/Express, PostgreSQL, tests Playwright, pipeline CI/CD GitHub Actions.',
      },
      {
        title: 'CI/CD',
        content:
          'Pipeline automatisé : lint, tests unitaires, build, tests E2E sur chaque PR. Déploiement staging puis production.',
      },
      {
        title: 'Tests Playwright',
        content:
          'Couverture E2E des parcours critiques : tirage, sauvegarde, consultation de l\'historique. Fixtures réutilisables pour les données de test.',
      },
      {
        title: 'Difficultés rencontrées',
        content:
          'Streaming SSE côté Angular, gestion des timeouts API, stabilisation des tests E2E avec des éléments dynamiques.',
      },
      {
        title: 'Évolutions futures',
        content:
          'Authentification OAuth, export PDF des tirages, synchronisation cloud, mode hors-ligne.',
      },
    ],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2026-06-20'),
  },
  {
    id: 'dev-book',
    name: 'The Dev Book',
    description:
      'Bibliothèque vivante centralisant projets, documentation, prompts IA et notes d\'apprentissage.',
    technologies: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'Signals'],
    difficulties: [
      'Concevoir une architecture feature-based scalable',
      'Préparer le frontend pour une future API backend',
    ],
    lessonsLearned: [
      'Organiser le code par domaines métier (features)',
      'Utiliser des composants standalone pour réduire la complexité des modules',
    ],
    githubUrl: 'https://github.com/example/the-dev-book',
    screenshotUrls: [],
    sections: [
      {
        title: 'Présentation',
        content:
          'Application personnelle inspirée de Notion et Obsidian, dédiée au suivi de l\'apprentissage et du portfolio développeur.',
      },
      {
        title: 'Architecture',
        content:
          'Structure core/shared/features/layouts. Services avec Signals et données mockées en attendant le backend Node.js/Express/PostgreSQL.',
      },
    ],
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-06-29'),
  },
];

export { MOCK_PROJECTS };
