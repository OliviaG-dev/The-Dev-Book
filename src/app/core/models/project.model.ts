export interface ProjectSection {
  title: string;
  content: string;
}

export interface DevBookDocument {
  fileName: string;
  label: string;
  isTech: boolean;
  sections: ProjectSection[];
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
  devBookDocuments?: DevBookDocument[];
  devBookSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
