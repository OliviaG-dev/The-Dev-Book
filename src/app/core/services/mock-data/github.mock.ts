import { GitHubRepoStats } from '../../models';

/** Fallback minimal si l'API GitHub échoue (stats réelles après sync). */
const MOCK_GITHUB_REPOS: GitHubRepoStats[] = [
  {
    id: 'dev-book',
    projectId: 'dev-book',
    name: 'The-Dev-Book',
    fullName: 'OliviaG-dev/The-Dev-Book',
    url: 'https://github.com/OliviaG-dev/The-Dev-Book',
    stars: 0,
    forks: 0,
    openIssues: 0,
    language: 'TypeScript',
    updatedAt: new Date('2026-06-29'),
  },
  {
    id: 'tarotmind',
    projectId: 'tarotmind',
    name: 'TarotMind',
    fullName: 'OliviaG-dev/TarotMind',
    url: 'https://github.com/OliviaG-dev/TarotMind',
    stars: 0,
    forks: 0,
    openIssues: 0,
    language: 'TypeScript',
    updatedAt: new Date('2026-06-20'),
  },
];

export { MOCK_GITHUB_REPOS };
