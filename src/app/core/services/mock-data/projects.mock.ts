import { Project } from '../../models';

function createProject(
  partial: Pick<Project, 'id' | 'name' | 'description' | 'technologies' | 'githubUrl'> &
    Partial<Omit<Project, 'id' | 'name' | 'description' | 'technologies' | 'githubUrl'>>,
): Project {
  return {
    difficulties: [],
    lessonsLearned: [],
    screenshotUrls: [],
    sections: [
      {
        title: 'Présentation',
        content: partial.description,
      },
    ],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2026-06-01'),
    ...partial,
  };
}

const MOCK_PROJECTS: Project[] = [
  createProject({
    id: 'dev-book',
    name: 'The Dev Book',
    description:
      'Bibliothèque vivante centralisant projets, documentation, prompts IA et notes d\'apprentissage.',
    technologies: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'Signals'],
    githubUrl: 'https://github.com/OliviaG-dev/The-Dev-Book',
    difficulties: [
      'Concevoir une architecture feature-based scalable',
      'Préparer le frontend pour une future API backend',
    ],
    lessonsLearned: [
      'Organiser le code par domaines métier (features)',
      'Utiliser des composants standalone pour réduire la complexité des modules',
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          'Application personnelle inspirée de Notion et Obsidian, dédiée au suivi de l\'apprentissage et du portfolio développeur.',
      },
      {
        title: 'Architecture',
        content:
          'Structure core/shared/features/layouts. Services avec Signals et données mockées en attendant le backend Node.js/Express/PostgreSQL.',
      },
    ],
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-06-29'),
  }),
  createProject({
    id: 'planmyjob',
    name: 'PlanMyJob',
    description:
      'Organisez votre recherche d\'emploi comme un vrai projet : Kanban, planning, tâches et outils de candidature.',
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'React Router'],
    githubUrl: 'https://github.com/OliviaG-dev/PlanMyJob',
    demoUrl: 'https://plan-my-job.vercel.app',
    difficulties: [
      'Synchroniser Kanban, calendrier et fiches candidature dans une UX cohérente',
      'Pipeline CI/CD avec preview Vercel sur chaque PR',
    ],
    lessonsLearned: [
      'Découper pages, hooks et services Supabase pour garder les écrans lisibles',
      'Automatiser le déploiement uniquement après une CI verte',
    ],
    sections: [
      {
        title: 'Fonctionnalités',
        content:
          'Suivi des candidatures (drag & drop), analyse d\'offre, générateur de lettre, CV, sites d\'emploi, objectifs hebdo/mois et auth Supabase.',
      },
    ],
    updatedAt: new Date('2026-06-15'),
  }),
  createProject({
    id: 'numora',
    name: 'Numora',
    description:
      'Expérience interactive de numérologie moderne révélant énergies, cycles et chemins de vie.',
    technologies: ['React', 'TypeScript', 'CSS', 'Vite'],
    githubUrl: 'https://github.com/OliviaG-dev/Numora-MOBILE',
  }),
  createProject({
    id: 'noctis',
    name: 'Noctis',
    description:
      'Calendrier astrologique intelligent : phases lunaires, rétrogrades, ingrès planétaires et éclipses.',
    technologies: ['React', 'TypeScript', 'Vite', 'Day.js'],
    githubUrl: 'https://github.com/OliviaG-dev/Noctis',
    demoUrl: 'https://noctis-chi.vercel.app',
  }),
  createProject({
    id: 'terracrea',
    name: 'TerraCréa',
    description:
      'Plateforme React Native pour découvrir et gérer des créations artisanales locales (marketplace artisan).',
    technologies: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'Vitest'],
    githubUrl: 'https://github.com/OliviaG-dev/TerraCrea',
    demoUrl: 'https://terra-crea.vercel.app',
    difficulties: [
      'Gérer favoris, avis et recherche multi-critères avec Supabase RLS',
      'Maintenir une suite de tests volumineuse sur mobile',
    ],
    lessonsLearned: [
      'Centraliser les styles et composants UI pour limiter la duplication',
      'Isoler la logique métier dans des services testables',
    ],
    updatedAt: new Date('2026-05-20'),
  }),
  createProject({
    id: 'starsnap',
    name: 'StarSnap',
    description:
      'Un fragment d\'univers par jour : images d\'astronomie avec traduction automatique en français.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/OliviaG-dev/StarSnap',
    demoUrl: 'https://star-snap.vercel.app',
    difficulties: [
      'Fallback NASA APOD → Unsplash quand l\'API NASA est indisponible',
      'Cache client pour la traduction Google Translate',
    ],
    updatedAt: new Date('2026-04-10'),
  }),
  createProject({
    id: 'tarotmind',
    name: 'TarotMind',
    description:
      'Application de tirage et d\'interprétation de tarot assistée par IA, avec historique local et encyclopédie.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'OpenAI', 'Playwright'],
    githubUrl: 'https://github.com/OliviaG-dev/TarotMind',
    demoUrl: 'https://tarot-mind-client.vercel.app',
    difficulties: [
      'Gestion du quota IA, rate limiting et fallback mock côté API',
      'Pipeline CI avec tests E2E Playwright',
    ],
    lessonsLearned: [
      'Monorepo client/server avec types partagés',
      'Observabilité des coûts IA via endpoint dédié',
    ],
    sections: [
      {
        title: 'Architecture',
        content:
          'SPA React + API Express, 7 types de tirage, profil et historique en localStorage, tests Vitest et Playwright.',
      },
    ],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2026-06-20'),
  }),
  createProject({
    id: 'track-r',
    name: 'Track€r',
    description:
      'Application de gestion de finances personnelles : comptes, budgets, objectifs d\'épargne et dashboard.',
    technologies: ['React', 'TypeScript', 'Zustand', 'Vite', 'date-fns'],
    githubUrl: 'https://github.com/OliviaG-dev/Track-r',
    demoUrl: 'https://track-r-six.vercel.app',
  }),
  createProject({
    id: 'skillloop',
    name: 'SkillLoop',
    description:
      'Apprendre, pratiquer, progresser : formations structurées en loops quotidiennes avec XP et badges.',
    technologies: ['React', 'TypeScript', 'Zustand', 'Vite', 'React Router'],
    githubUrl: 'https://github.com/OliviaG-dev/SkillLoop',
    demoUrl: 'https://skill-loop-five.vercel.app',
  }),
  createProject({
    id: 'pick-and-play',
    name: 'Pick&Play',
    description:
      'Bibliothèque interactive de films, séries et livres avec organisation par drag & drop.',
    technologies: ['React', 'TypeScript', 'Vite', '@dnd-kit'],
    githubUrl: 'https://github.com/OliviaG-dev/Pick-and-Play',
    demoUrl: 'https://pick-and-play-psi.vercel.app',
  }),
  createProject({
    id: 'mappermis',
    name: 'MapPermis',
    description:
      'Cartographie interactive pour créer et réviser les parcours d\'examen du permis de conduire.',
    technologies: ['React', 'TypeScript', 'Leaflet', 'React-Leaflet'],
    githubUrl: 'https://github.com/OliviaG-dev/MapPermis',
    demoUrl: 'https://map-permis.vercel.app',
    difficulties: [
      'Intégrer Leaflet-Draw avec une UX mobile/tablette fluide',
      'Persistance des parcours en localStorage',
    ],
    updatedAt: new Date('2026-03-01'),
  }),
  createProject({
    id: 'booksy',
    name: 'Booksy',
    description:
      'Mur collaboratif de recommandations de livres avec filtres par genre, likes et pagination.',
    technologies: ['Vue', 'TypeScript', 'Vite', 'Supabase', 'pnpm'],
    githubUrl: 'https://github.com/OliviaG-dev/Booksy',
    demoUrl: 'https://booksy-navy.vercel.app',
  }),
  createProject({
    id: 'randomsims-api',
    name: 'RandomSims API',
    description:
      'API REST Express pour randomiser aspirations, traits, métiers et défis dans Les Sims 4.',
    technologies: ['Node.js', 'Express', 'TypeScript'],
    githubUrl: 'https://github.com/OliviaG-dev/RandomSims-API',
  }),
  createProject({
    id: 'indicium',
    name: 'Indicium',
    description:
      'Tableau de bord électoral français : KPIs, graphiques, cartes et export PDF.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Recharts'],
    githubUrl: 'https://github.com/OliviaG-dev/Indicium',
    demoUrl: 'https://indicium-nu.vercel.app',
  }),
  createProject({
    id: 'portfolio',
    name: 'Portfolio',
    description:
      'Portfolio interactif présentant l\'ensemble des créations web et le parcours développeur.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'pnpm'],
    githubUrl: 'https://github.com/OliviaG-dev/Portfolio-react-ts',
    demoUrl: 'https://portfolio-olivia-g-dev.vercel.app',
  }),
  createProject({
    id: 'linea-arcana',
    name: 'Linea Arcana',
    description:
      'Révèle votre ligne de vie à travers les 22 arcanes du Tarot de Marseille et la roue de Pythagore.',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router'],
    githubUrl: 'https://github.com/OliviaG-dev/Linea-arcana',
    demoUrl: 'https://linea-arcana.vercel.app',
  }),
  createProject({
    id: 'chatblog',
    name: 'ChatBlog',
    description:
      'Blog fullstack sur le thème des chats : articles, catégories, édition et suppression.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/OliviaG-dev/ChatBlog',
    demoUrl: 'https://chat-blog.vercel.app',
  }),
  createProject({
    id: 'grimoire-d-aether',
    name: 'Grimoire d\'Áether',
    description:
      'Wiki ésotérique des cartes divinatoires : jeux, fiches détaillées et panneau admin.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Clerk', 'Vite'],
    githubUrl: 'https://github.com/OliviaG-dev/Grimoire-d-Aether',
    demoUrl: 'https://grimoire-d-aether.vercel.app',
    difficulties: [
      'Modéliser jeux et cartes avec RLS Supabase et upload Storage',
      'Auth admin via Clerk sans exposer les clés sensibles',
    ],
    updatedAt: new Date('2026-02-15'),
  }),
  createProject({
    id: 'dualarcana',
    name: 'DualArcana',
    description:
      'Croise l\'arcane majeur de l\'année avec ton arcane personnel pour une lecture symbolique.',
    technologies: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/OliviaG-dev/DualArcana',
    demoUrl: 'https://dual-arcana.vercel.app',
  }),
  createProject({
    id: 'randomsims',
    name: 'RandomSims',
    description:
      'Générateur de défis aléatoires pour Les Sims 4, connecté à RandomSims-API.',
    technologies: ['React', 'TypeScript', 'Vite', 'html2canvas'],
    githubUrl: 'https://github.com/OliviaG-dev/RandomSims',
    demoUrl: 'https://random-sims.vercel.app',
  }),
  createProject({
    id: 'allzodiacs',
    name: 'AllZodiacs',
    description:
      'Moteur universel de correspondance astrologique : 16 systèmes à partir d\'une date de naissance.',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router'],
    githubUrl: 'https://github.com/OliviaG-dev/AllZodiacs',
    demoUrl: 'https://all-zodiacs.vercel.app',
  }),
  createProject({
    id: 'jobsniper',
    name: 'JobSniper',
    description:
      'Scraping d\'offres d\'emploi, déduplication et interface de suivi des candidatures.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Playwright', 'Cheerio'],
    githubUrl: 'https://github.com/OliviaG-dev/JobSniper',
    demoUrl: 'https://job-sniper-theta.vercel.app',
  }),
  createProject({
    id: 'crystal-swipe',
    name: 'Crystal Swipe',
    description:
      'Swipe tes ressentis pour découvrir les pierres et cristaux qui résonnent avec ton énergie du moment.',
    technologies: ['React', 'TypeScript', 'Vite', 'Playwright', 'Vitest'],
    githubUrl: 'https://github.com/OliviaG-dev/Crystal-swipe',
    demoUrl: 'https://crystal-swipe.vercel.app',
  }),
  createProject({
    id: 'cvforgeai',
    name: 'CVForge AI',
    description:
      'Génération de CV professionnel assistée par IA (Gemini) avec export PDF via Puppeteer.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini', 'Puppeteer'],
    githubUrl: 'https://github.com/OliviaG-dev/CVForgeAI',
    demoUrl: 'https://cv-forge-ai-six.vercel.app',
  }),
  createProject({
    id: 'lumiel',
    name: 'Lumiel',
    description:
      'Site vitrine et dashboard pour praticiens bien-être : prestations, RDV, blog et avis (Supabase).',
    technologies: ['React', 'TypeScript', 'Supabase', 'Vite', 'React Router'],
    githubUrl: 'https://github.com/OliviaG-dev/Lumiel',
    demoUrl: 'https://lumiel-ten.vercel.app',
  }),
  createProject({
    id: 'r-vipermis',
    name: 'RéviPermis',
    description:
      'Quiz interactif pour réviser les 100 questions officielles de vérification technique du permis.',
    technologies: ['React', 'TypeScript', 'Vite', 'Vitest'],
    githubUrl: 'https://github.com/OliviaG-dev/R-viPermis',
    demoUrl: 'https://r-vi-permis.vercel.app',
    difficulties: [
      'Parser le PDF officiel en JSON structuré',
      'Logique QCM multi-catégories (véhicule, QSER, secours)',
    ],
    lessonsLearned: [
      'Extraire la logique quiz dans un hook testable (91 % couverture)',
      'Lazy loading des routes pour un bundle initial léger',
    ],
    updatedAt: new Date('2026-01-20'),
  }),
];

export { MOCK_PROJECTS };
