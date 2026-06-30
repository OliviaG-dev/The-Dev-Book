export interface GitHubRepoStats {
  id: string;
  projectId: string;
  name: string;
  fullName: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  updatedAt: Date;
}

export interface GitHubSyncStatus {
  lastSyncAt: Date | null;
  isSyncing: boolean;
  error: string | null;
}

export interface GitHubAggregateStats {
  reposCount: number;
  totalStars: number;
  totalForks: number;
  totalOpenIssues: number;
}
