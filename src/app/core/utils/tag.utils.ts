export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export function matchesTags(itemTags: string[], selectedTags: string[]): boolean {
  if (selectedTags.length === 0) {
    return true;
  }

  const normalizedItemTags = itemTags.map(normalizeTag);
  return selectedTags.every((tag) => normalizedItemTags.includes(normalizeTag(tag)));
}

export function extractExcerpt(text: string, maxLength = 120): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return `${cleaned.slice(0, maxLength)}…`;
}
