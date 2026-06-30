import { GitHubRepoStats } from '../../models';

const MOCK_GITHUB_REPOS: GitHubRepoStats[] = [
  {
    id: 'tarotmind',
    projectId: 'tarotmind',
    name: 'tarotmind',
    fullName: 'example/tarotmind',
    url: 'https://github.com/example/tarotmind',
    stars: 12,
    forks: 3,
    openIssues: 2,
    language: 'TypeScript',
    updatedAt: new Date('2026-06-18'),
  },
  {
    id: 'dev-book',
    projectId: 'dev-book',
    name: 'the-dev-book',
    fullName: 'example/the-dev-book',
    url: 'https://github.com/example/the-dev-book',
    stars: 5,
    forks: 1,
    openIssues: 0,
    language: 'TypeScript',
    updatedAt: new Date('2026-06-29'),
  },
];

export { MOCK_GITHUB_REPOS };
