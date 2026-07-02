import { normalizeTag } from './tag.utils';

export type TagCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'styling'
  | 'language'
  | 'mobile'
  | 'testing'
  | 'devops'
  | 'ai'
  | 'concepts';

export interface TagChipColors {
  bg: string;
  border: string;
  text: string;
  activeBg: string;
  activeBorder: string;
}

const CATEGORY_COLORS: Record<TagCategory, TagChipColors> = {
  frontend: chipColors('#60a5fa'),
  backend: chipColors('#34d399'),
  database: chipColors('#fbbf24'),
  styling: chipColors('#f472b6'),
  language: chipColors('#a5b4fc'),
  mobile: chipColors('#22d3ee'),
  testing: chipColors('#a3e635'),
  devops: chipColors('#fb923c'),
  ai: chipColors('#c084fc'),
  concepts: chipColors('#94a3b8'),
};

const TAG_CATEGORY_MAP: Record<string, TagCategory> = {
  angular: 'frontend',
  react: 'frontend',
  vue: 'frontend',
  vite: 'frontend',
  'react router': 'frontend',
  signals: 'frontend',
  rxjs: 'frontend',
  zustand: 'frontend',
  ssr: 'frontend',
  standalone: 'frontend',
  '@dnd-kit': 'frontend',
  html2canvas: 'frontend',
  recharts: 'frontend',
  leaflet: 'frontend',
  'react-leaflet': 'frontend',
  observables: 'frontend',
  operators: 'frontend',
  lifecycle: 'frontend',
  migration: 'frontend',
  comparison: 'frontend',
  patterns: 'frontend',

  scss: 'styling',
  css: 'styling',
  'tailwind css': 'styling',
  'angular material': 'styling',

  typescript: 'language',
  javascript: 'language',

  'node.js': 'backend',
  express: 'backend',
  cheerio: 'backend',
  puppeteer: 'backend',
  backend: 'backend',
  microservices: 'backend',

  mongodb: 'database',
  postgresql: 'database',
  supabase: 'database',

  'react native': 'mobile',
  expo: 'mobile',

  vitest: 'testing',
  playwright: 'testing',
  testing: 'testing',
  e2e: 'testing',
  'page-object': 'testing',

  docker: 'devops',
  devops: 'devops',
  containers: 'devops',
  'github-actions': 'devops',
  pipeline: 'devops',
  pnpm: 'devops',

  openai: 'ai',
  gemini: 'ai',

  clerk: 'concepts',
  architecture: 'concepts',
  refactoring: 'concepts',
  review: 'concepts',
  'best-practices': 'concepts',
  'system-prompt': 'concepts',
  assistant: 'concepts',
  template: 'concepts',
  'day.js': 'concepts',
  'date-fns': 'concepts',
};

const CATEGORY_KEYWORDS: Array<{ category: TagCategory; pattern: RegExp }> = [
  { category: 'frontend', pattern: /react|angular|vue|vite|router|zustand|rxjs|signal|standalone|leaflet|dnd|canvas|rechart|ssr|frontend|ui|lifecycle|observable|operator/ },
  { category: 'styling', pattern: /scss|sass|css|tailwind|style|material/ },
  { category: 'language', pattern: /typescript|javascript|ts\b|js\b/ },
  { category: 'backend', pattern: /node|express|backend|microservice|api|server|cheerio|puppeteer/ },
  { category: 'database', pattern: /mongo|postgres|sql|supabase|database|db/ },
  { category: 'mobile', pattern: /mobile|native|expo|ios|android/ },
  { category: 'testing', pattern: /test|vitest|playwright|e2e|cypress|jest|spec/ },
  { category: 'devops', pattern: /docker|devops|container|github-actions|pipeline|ci|cd|deploy|pnpm|npm/ },
  { category: 'ai', pattern: /openai|gemini|gpt|llm|ai\b/ },
  { category: 'concepts', pattern: /architect|refactor|review|pattern|prompt|assistant|template|migration|comparison|practice/ },
];

function chipColors(main: string, text = main): TagChipColors {
  const rgb = hexToRgb(main);
  if (!rgb) {
    return CATEGORY_COLORS.concepts;
  }

  const { r, g, b } = rgb;
  return {
    bg: `rgba(${r}, ${g}, ${b}, 0.14)`,
    border: `rgba(${r}, ${g}, ${b}, 0.38)`,
    text,
    activeBg: `rgba(${r}, ${g}, ${b}, 0.28)`,
    activeBorder: main,
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) {
    return null;
  }

  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) {
    return null;
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function getTagCategory(tag: string): TagCategory {
  const key = normalizeTag(tag);

  if (TAG_CATEGORY_MAP[key]) {
    return TAG_CATEGORY_MAP[key];
  }

  for (const { category, pattern } of CATEGORY_KEYWORDS) {
    if (pattern.test(key)) {
      return category;
    }
  }

  return 'concepts';
}

export function getTagCategoryLabel(category: TagCategory): string {
  const labels: Record<TagCategory, string> = {
    frontend: 'Front',
    backend: 'Back',
    database: 'Data',
    styling: 'Style',
    language: 'Langage',
    mobile: 'Mobile',
    testing: 'Tests',
    devops: 'DevOps',
    ai: 'IA',
    concepts: 'Concept',
  };

  return labels[category];
}

export const TAG_CATEGORY_LEGEND: ReadonlyArray<{
  category: TagCategory;
  label: string;
}> = [
  { category: 'frontend', label: getTagCategoryLabel('frontend') },
  { category: 'backend', label: getTagCategoryLabel('backend') },
  { category: 'database', label: getTagCategoryLabel('database') },
  { category: 'styling', label: getTagCategoryLabel('styling') },
  { category: 'language', label: getTagCategoryLabel('language') },
  { category: 'mobile', label: getTagCategoryLabel('mobile') },
  { category: 'testing', label: getTagCategoryLabel('testing') },
  { category: 'devops', label: getTagCategoryLabel('devops') },
  { category: 'ai', label: getTagCategoryLabel('ai') },
  { category: 'concepts', label: getTagCategoryLabel('concepts') },
];

function toChipStyle(colors: TagChipColors): Record<string, string> {
  return {
    '--tag-chip-bg': colors.bg,
    '--tag-chip-border': colors.border,
    '--tag-chip-text': colors.text,
    '--tag-chip-active-bg': colors.activeBg,
    '--tag-chip-active-border': colors.activeBorder,
  };
}

export function getCategoryChipStyle(category: TagCategory): Record<string, string> {
  return toChipStyle(CATEGORY_COLORS[category]);
}

export function getTagChipColors(tag: string): TagChipColors {
  return CATEGORY_COLORS[getTagCategory(tag)];
}

export function getTagChipStyle(tag: string): Record<string, string> {
  return toChipStyle(getTagChipColors(tag));
}
