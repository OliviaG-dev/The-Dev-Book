import { ProjectSection } from '../models';

export const DEVBOOK_FOLDER = '.devbook';

export interface DevBookFrontmatter {
  id?: string;
  name?: string;
  description?: string;
  technologies?: string[];
  newTechnologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ParsedDevBookFile {
  fileName: string;
  frontmatter: DevBookFrontmatter;
  sections: ProjectSection[];
  difficulties: string[];
  lessonsLearned: string[];
}

const DIFFICULTIES_TITLE = /difficult/i;
const LESSONS_TITLE = /leçons|lecons/i;

export function isTechDocFile(fileName: string): boolean {
  return /tech-/i.test(fileName) && fileName.endsWith('.md');
}

/** Tech docs first, then other files, index.md last (metadata source). */
export function sortDevBookFileNames(fileNames: string[]): string[] {
  const techFiles = fileNames.filter(isTechDocFile).sort((a, b) => a.localeCompare(b));
  const indexFile = fileNames.filter((name) => name.toLowerCase() === 'index.md');
  const otherFiles = fileNames
    .filter((name) => !isTechDocFile(name) && name.toLowerCase() !== 'index.md')
    .sort((a, b) => a.localeCompare(b));

  return [...techFiles, ...otherFiles, ...indexFile];
}

export function parseDevBookMarkdown(fileName: string, rawContent: string): ParsedDevBookFile {
  const { frontmatter, body } = splitFrontmatter(rawContent);
  const sections = parseSections(body);
  const difficulties = extractListFromSections(sections, DIFFICULTIES_TITLE);
  const lessonsLearned = extractListFromSections(sections, LESSONS_TITLE);

  const contentSections = sections
    .filter(
      (section) =>
        !DIFFICULTIES_TITLE.test(section.title) && !LESSONS_TITLE.test(section.title),
    )
    .map((section) => ({
      title: section.title,
      content: section.content,
    }));

  if (contentSections.length === 0 && body.trim() && !isIndexFile(fileName)) {
    contentSections.push({
      title: resolveSectionTitle(fileName, body),
      content: body.trim(),
    });
  }

  return {
    fileName,
    frontmatter,
    sections: contentSections,
    difficulties,
    lessonsLearned,
  };
}

export function mergeParsedDevBookFiles(files: ParsedDevBookFile[]): {
  frontmatter: DevBookFrontmatter;
  sections: ProjectSection[];
  difficulties: string[];
  lessonsLearned: string[];
} {
  const fileOrder = sortDevBookFileNames(files.map((file) => file.fileName));
  const ordered = [...files].sort(
    (a, b) => fileOrder.indexOf(a.fileName) - fileOrder.indexOf(b.fileName),
  );

  const indexFile = ordered.find((file) => file.fileName.toLowerCase() === 'index.md');
  const frontmatter = indexFile?.frontmatter ?? ordered[0]?.frontmatter ?? {};

  const techSections = ordered
    .filter((file) => isTechDocFile(file.fileName))
    .flatMap((file) => file.sections);

  const otherSections = ordered
    .filter(
      (file) => !isTechDocFile(file.fileName) && file.fileName.toLowerCase() !== 'index.md',
    )
    .flatMap((file) => file.sections);

  const indexSections = indexFile?.sections ?? [];

  return {
    frontmatter,
    sections: [...techSections, ...otherSections, ...indexSections],
    difficulties: uniqueStrings(ordered.flatMap((file) => file.difficulties)),
    lessonsLearned: uniqueStrings(ordered.flatMap((file) => file.lessonsLearned)),
  };
}

function isIndexFile(fileName: string): boolean {
  return fileName.toLowerCase() === 'index.md';
}

function splitFrontmatter(content: string): { frontmatter: DevBookFrontmatter; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  return {
    frontmatter: parseFrontmatterBlock(match[1]),
    body: match[2],
  };
}

function parseFrontmatterBlock(block: string): DevBookFrontmatter {
  const frontmatter: DevBookFrontmatter = {};

  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const arrayMatch = trimmed.match(/^([\w-]+):\s*\[(.*)\]$/);
    if (arrayMatch) {
      const values = parseYamlArray(arrayMatch[2]);
      assignFrontmatterArray(frontmatter, arrayMatch[1], values);
      continue;
    }

    const stringMatch = trimmed.match(/^([\w-]+):\s*(.+)$/);
    if (stringMatch) {
      assignFrontmatterString(frontmatter, stringMatch[1], stripQuotes(stringMatch[2]));
    }
  }

  return frontmatter;
}

function parseYamlArray(value: string): string[] {
  if (!value.trim()) {
    return [];
  }

  return value
    .split(',')
    .map((item) => stripQuotes(item.trim()))
    .filter(Boolean);
}

function assignFrontmatterArray(
  frontmatter: DevBookFrontmatter,
  key: string,
  values: string[],
): void {
  if (key === 'technologies') {
    frontmatter.technologies = values;
    return;
  }

  if (key === 'newTechnologies') {
    frontmatter.newTechnologies = values;
  }
}

function assignFrontmatterString(
  frontmatter: DevBookFrontmatter,
  key: string,
  value: string,
): void {
  switch (key) {
    case 'id':
      frontmatter.id = value;
      break;
    case 'name':
      frontmatter.name = value;
      break;
    case 'description':
      frontmatter.description = value;
      break;
    case 'githubUrl':
      frontmatter.githubUrl = value;
      break;
    case 'demoUrl':
      frontmatter.demoUrl = value;
      break;
  }
}

function stripQuotes(value: string): string {
  return value.replace(/^['"]|['"]$/g, '');
}

function parseSections(markdown: string): ProjectSection[] {
  if (!markdown.trim()) {
    return [];
  }

  const parts = markdown.split(/^## /m).filter((part) => part.trim());
  return parts.map((part) => {
    const newlineIndex = part.indexOf('\n');
    if (newlineIndex === -1) {
      return { title: part.trim(), content: '' };
    }

    return {
      title: part.slice(0, newlineIndex).trim(),
      content: part.slice(newlineIndex + 1).trim(),
    };
  });
}

function extractListFromSections(
  sections: ProjectSection[],
  titlePattern: RegExp,
): string[] {
  const section = sections.find((item) => titlePattern.test(item.title));
  if (!section) {
    return [];
  }

  return section.content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function resolveSectionTitle(fileName: string, body: string): string {
  const headingMatch = body.match(/^##\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return humanizeTechFileName(fileName);
}

function humanizeTechFileName(fileName: string): string {
  return fileName
    .replace(/^\d+-/, '')
    .replace(/^tech-/i, '')
    .replace(/\.md$/i, '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}
