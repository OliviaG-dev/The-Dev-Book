export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  difficulties: string[];
  lessonsLearned: string[];
  githubUrl?: string;
  demoUrl?: string;
  screenshotUrls: string[];
  sections: ProjectSection[];
  createdAt: Date;
  updatedAt: Date;
}
