import { describe, expect, it } from 'vitest';

import {
  isTechDocFile,
  mergeParsedDevBookFiles,
  parseDevBookMarkdown,
  sortDevBookFileNames,
} from './devbook.parser';

describe('devbook.parser', () => {
  it('sorts tech files before other docs and index last', () => {
    expect(
      sortDevBookFileNames([
        'index.md',
        '05-gestion-donnees.md',
        '02-tech-playwright.md',
        '03-tech-supabase.md',
      ]),
    ).toEqual([
      '02-tech-playwright.md',
      '03-tech-supabase.md',
      '05-gestion-donnees.md',
      'index.md',
    ]);
  });

  it('detects tech documentation files', () => {
    expect(isTechDocFile('02-tech-playwright.md')).toBe(true);
    expect(isTechDocFile('index.md')).toBe(false);
  });

  it('parses frontmatter, sections and learning lists from index', () => {
    const parsed = parseDevBookMarkdown(
      'index.md',
      `---
id: tarotmind
description: Projet tarot IA
technologies: [React, TypeScript]
newTechnologies: [Playwright, OpenAI]
---

## Contexte

Apprentissage E2E.

## Difficultés liées aux nouvelles technos

- Config Playwright en CI
- Quota OpenAI

## Leçons apprises

- Isoler la logique API
`,
    );

    expect(parsed.frontmatter.newTechnologies).toEqual(['Playwright', 'OpenAI']);
    expect(parsed.difficulties).toEqual(['Config Playwright en CI', 'Quota OpenAI']);
    expect(parsed.lessonsLearned).toEqual(['Isoler la logique API']);
    expect(parsed.sections).toEqual([{ title: 'Contexte', content: 'Apprentissage E2E.' }]);
  });

  it('merges tech sections before index sections', () => {
    const merged = mergeParsedDevBookFiles([
      parseDevBookMarkdown('index.md', '## Contexte\nVue globale.'),
      parseDevBookMarkdown('02-tech-playwright.md', '## Playwright\n\nSetup et tests E2E.'),
    ]);

    expect(merged.sections.map((section) => section.title)).toEqual([
      'Playwright',
      'Contexte',
    ]);
    expect(merged.documents.map((document) => document.fileName)).toEqual([
      '02-tech-playwright.md',
      'index.md',
    ]);
  });
});
