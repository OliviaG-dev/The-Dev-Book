export type PromptCategory =
  | 'Cursor'
  | 'Angular'
  | 'React'
  | 'Playwright'
  | 'CI/CD'
  | 'OpenAI';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
