export const API_CONFIG = {
  baseUrl: '/api',
  githubApiUrl: 'https://api.github.com',
  devBookFolder: '.devbook',
  endpoints: {
    projects: '/projects',
    prompts: '/prompts',
    notes: '/notes',
    githubSync: '/github/sync',
    githubRepos: '/github/repos',
  },
} as const;
