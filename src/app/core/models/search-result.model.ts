import { ActivityType } from './activity.model';

export interface SearchResult {
  id: string;
  type: ActivityType;
  title: string;
  excerpt: string;
  route: string;
  tags: string[];
}
