import { ProjectSection } from './project.model';

export interface DevBookProjectOverlay {
  description?: string;
  technologies?: string[];
  newTechnologies?: string[];
  demoUrl?: string;
  sections?: ProjectSection[];
  difficulties?: string[];
  lessonsLearned?: string[];
  devBookSyncedAt: string;
}

export interface DevBookSyncStatus {
  lastSyncAt: Date | null;
  isSyncing: boolean;
  error: string | null;
  syncedCount: number;
  missingCount: number;
}
