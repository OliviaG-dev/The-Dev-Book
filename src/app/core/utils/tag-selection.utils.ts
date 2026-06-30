import { normalizeTag } from './tag.utils';

export function toggleTagSelection(selectedTags: string[], tag: string): string[] {
  const normalized = normalizeTag(tag);
  const exists = selectedTags.some((selected) => normalizeTag(selected) === normalized);

  if (exists) {
    return selectedTags.filter((selected) => normalizeTag(selected) !== normalized);
  }

  return [...selectedTags, tag];
}
