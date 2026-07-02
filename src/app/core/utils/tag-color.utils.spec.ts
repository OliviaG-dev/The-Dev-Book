import { describe, expect, it } from 'vitest';

import { getTagCategory, getTagChipColors, getTagChipStyle } from './tag-color.utils';

describe('tag-color.utils', () => {
  it('groups frontend technologies under the same color', () => {
    const react = getTagChipColors('React');
    const angular = getTagChipColors('Angular');
    const vue = getTagChipColors('Vue');

    expect(react).toEqual(angular);
    expect(react).toEqual(vue);
    expect(getTagCategory('React')).toBe('frontend');
  });

  it('groups backend and database tags separately', () => {
    expect(getTagCategory('Node.js')).toBe('backend');
    expect(getTagCategory('MongoDB')).toBe('database');
    expect(getTagChipColors('Node.js')).not.toEqual(getTagChipColors('MongoDB'));
  });

  it('infers categories from keywords for unknown tags', () => {
    expect(getTagCategory('docker-compose')).toBe('devops');
    expect(getTagCategory('unit-test')).toBe('testing');
  });

  it('exposes css custom properties for chips', () => {
    expect(getTagChipStyle('TypeScript')).toEqual(
      expect.objectContaining({
        '--tag-chip-text': '#a5b4fc',
        '--tag-chip-border': expect.stringContaining('rgba'),
      }),
    );
  });
});
