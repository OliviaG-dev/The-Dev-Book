export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  newTechnologies?: string[];
  difficulties: string[];
  lessonsLearned: string[];
  githubUrl?: string;
  demoUrl?: string;
  screenshotUrls: string[];
  sections: ProjectSection[];
  devBookSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
