function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith('|') && line.trim().endsWith('|');
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s:-]+\|[\s|:-]*$/.test(line.trim());
}

function renderTableRow(line: string, cellTag: 'td' | 'th'): string {
  const cells = line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

  return `<tr>${cells.map((cell) => `<${cellTag}>${renderInlineMarkdown(escapeHtml(cell))}</${cellTag}>`).join('')}</tr>`;
}

export function renderMarkdownToHtml(markdown: string): string {
  if (!markdown.trim()) {
    return '';
  }

  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index++;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      index++;
      const codeLines: string[] = [];

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index++;
      }

      const codeClass = language ? ` class="language-${escapeHtml(language)}"` : '';
      html.push(`<pre><code${codeClass}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      index++;
      continue;
    }

    if (isTableRow(trimmed) && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      html.push('<table><thead>');
      html.push(renderTableRow(trimmed, 'th'));
      html.push('</thead><tbody>');
      index += 2;

      while (index < lines.length && isTableRow(lines[index])) {
        html.push(renderTableRow(lines[index], 'td'));
        index++;
      }

      html.push('</tbody></table>');
      continue;
    }

    if (trimmed.startsWith('### ')) {
      html.push(`<h4>${renderInlineMarkdown(escapeHtml(trimmed.slice(4)))}</h4>`);
      index++;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      html.push(`<h5>${renderInlineMarkdown(escapeHtml(trimmed.slice(5)))}</h5>`);
      index++;
      continue;
    }

    if (/^[-*] /.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*] /.test(lines[index].trim())) {
        items.push(
          `<li>${renderInlineMarkdown(escapeHtml(lines[index].trim().slice(2)))}</li>`,
        );
        index++;
      }

      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith('```') &&
      !lines[index].trim().startsWith('###') &&
      !lines[index].trim().startsWith('####') &&
      !/^[-*] /.test(lines[index].trim()) &&
      !isTableRow(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index++;
    }

    html.push(`<p>${renderInlineMarkdown(escapeHtml(paragraphLines.join(' ')))}</p>`);
  }

  return html.join('');
}
