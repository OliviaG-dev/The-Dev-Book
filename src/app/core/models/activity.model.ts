export type ActivityType = 'project' | 'prompt' | 'note';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  updatedAt: Date;
  route: string;
}
