import { describe, expect, it } from 'vitest';

import { renderMarkdownToHtml } from './markdown.renderer';

describe('markdown.renderer', () => {
  it('renders headings, lists and inline code', () => {
    const html = renderMarkdownToHtml(`### Pourquoi ce choix

- Point 1
- Point 2

Utiliser \`signal()\` partout.`);

    expect(html).toContain('<h4>Pourquoi ce choix</h4>');
    expect(html).toContain('<ul><li>Point 1</li><li>Point 2</li></ul>');
    expect(html).toContain('<code>signal()</code>');
  });

  it('renders fenced code blocks and tables', () => {
    const html = renderMarkdownToHtml(`\`\`\`typescript
const value = 1;
\`\`\`

| Techno | Rôle |
|--------|------|
| Angular | UI |
`);

    expect(html).toContain('<pre><code class="language-typescript">');
    expect(html).toContain('const value = 1;');
    expect(html).toContain('<table><thead>');
    expect(html).toContain('<td>Angular</td>');
  });
});
