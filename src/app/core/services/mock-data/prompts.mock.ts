import { Prompt } from '../../models';

const MOCK_PROMPTS: Prompt[] = [
  {
    id: 'cursor-refactor',
    title: 'Refactoring Angular avec Cursor',
    description: 'Prompt pour refactoriser un composant Angular en standalone avec Signals.',
    content: `Analyse ce composant Angular et refactorise-le en :
- Standalone component
- Signals pour l'état local
- Séparation logique UI / service
- Typage strict TypeScript

Conserve le comportement existant. Explique chaque changement.`,
    category: 'Cursor',
    tags: ['refactoring', 'signals', 'standalone'],
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-05-10'),
  },
  {
    id: 'angular-architecture',
    title: 'Review architecture Angular',
    description: 'Demander une revue d\'architecture feature-based.',
    content: `Review this Angular project structure and suggest improvements for:
- Feature-based organization
- Service layer design
- Signal usage
- Routing lazy loading readiness
- Preparation for backend API integration`,
    category: 'Angular',
    tags: ['architecture', 'review', 'best-practices'],
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-06-01'),
  },
  {
    id: 'playwright-e2e',
    title: 'Générer tests Playwright',
    description: 'Créer des tests E2E pour un parcours utilisateur critique.',
    content: `Generate Playwright E2E tests for this user flow:
1. Navigate to login page
2. Fill credentials
3. Submit form
4. Assert dashboard is visible

Use page object pattern. Add data-testid attributes suggestions.`,
    category: 'Playwright',
    tags: ['e2e', 'testing', 'page-object'],
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-04-15'),
  },
  {
    id: 'ci-pipeline',
    title: 'Pipeline CI/CD GitHub Actions',
    description: 'Configurer un pipeline lint + test + build pour un projet Angular.',
    content: `Create a GitHub Actions workflow for an Angular project with:
- npm ci
- lint
- unit tests
- production build
- cache node_modules

Trigger on push to main and pull requests.`,
    category: 'CI/CD',
    tags: ['github-actions', 'pipeline', 'angular'],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    id: 'openai-system-prompt',
    title: 'System prompt technique',
    description: 'Template de system prompt pour assistant code senior.',
    content: `You are a senior full-stack developer specializing in Angular, Node.js, and PostgreSQL.

Rules:
- Write clean, typed, maintainable code
- Follow existing project conventions
- Prefer Signals over RxJS when state is simple
- Explain trade-offs briefly
- Never expose secrets or credentials`,
    category: 'OpenAI',
    tags: ['system-prompt', 'assistant', 'template'],
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-02-28'),
  },
  {
    id: 'react-migration',
    title: 'Comparaison Angular vs React',
    description: 'Analyser les différences de patterns entre Angular et React.',
    content: `Compare how this React component pattern maps to Angular 21:
- State management (useState vs signals)
- Effects (useEffect vs computed/effect)
- Component composition
- Routing

Provide equivalent Angular standalone component code.`,
    category: 'React',
    tags: ['migration', 'comparison', 'patterns'],
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-06-10'),
  },
];

export { MOCK_PROMPTS };
