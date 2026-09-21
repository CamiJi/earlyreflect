export type Lang = 'en' | 'fr';

export const defaultLang: Lang = 'en';

/** Langue par défaut à la racine : EN (spec §2.4) */
export const languages: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
};

const ui = {
  disciplines: {
    'show-reel': { en: 'Show Reel', fr: 'Showreel' },
    'technical-sound-design': { en: 'Technical Sound Design', fr: 'Sound design technique' },
    'field-recording': { en: 'Field Recording', fr: 'Prise de son terrain' },
    music: { en: 'Music', fr: 'Musique' },
  },
  nav: {
    work: { en: 'Work', fr: 'Travaux' },
    consulting: { en: 'Consulting & teaching', fr: 'Consulting & formation' },
    music: { en: 'Music', fr: 'Musique' },
    about: { en: 'About', fr: 'À propos' },
    contact: { en: 'Contact', fr: 'Contact' },
  },
  home: {
    heroTitle: { en: 'Mathieu Fiorentini', fr: 'Mathieu Fiorentini' },
    heroTagline: {
      en: 'Senior sound designer, Wwise consultant and composer',
      fr: 'Sound designer senior, consultant Wwise et compositeur',
    },
    seeShowreel: { en: 'Watch the showreel', fr: 'Voir le showreel' },
    contactMe: { en: 'Get in touch', fr: 'Me contacter' },
    showreelCaption: {
      en: 'Demo reel 2014–2025. All sounds captured under real-time conditions.',
      fr: 'Démo 2014–2025. Tous les sons captés en conditions temps réel.',
    },
    introTitle: { en: 'About', fr: 'Intro' },
    facetsTitle: { en: 'Three facets', fr: 'Trois facettes' },
    facetGame: { en: 'Game audio', fr: 'Game audio' },
    facetGameText: {
      en: 'Sound design, integration and dynamic mixing for narrative games — 15+ years with Quantic Dream, Ubisoft and Don’t Nod.',
      fr: 'Sound design, intégration et mix dynamique pour le jeu narratif — 15 ans avec Quantic Dream, Ubisoft et Don’t Nod.',
    },
    facetConsulting: { en: 'Consulting & teaching', fr: 'Consulting & formation' },
    facetConsultingText: {
      en: 'Wwise/WAAPI consulting, audio pipeline audits, and interactive audio teaching at ISART Digital.',
      fr: 'Consulting Wwise/WAAPI, audits de pipeline audio et enseignement de l’audio interactif à ISART Digital.',
    },
    facetMusic: { en: 'Music', fr: 'Musique' },
    facetMusicText: {
      en: 'Electronic and ambient music as Yakie — France Inter commissions, vinyl releases and field-recording based pieces.',
      fr: 'Musique électronique et ambient sous Yakie — commandes France Inter, sorties vinyle et pièces à base de prises de terrain.',
    },
    selectedWork: { en: 'Selected work', fr: 'Travaux sélectionnés' },
    allWork: { en: 'All work', fr: 'Tous les travaux' },
    skillsTitle: { en: 'Skills', fr: 'Compétences' },
    creditsTitle: { en: 'Credits', fr: 'Crédits' },
    toolsTitle: { en: 'Tools', fr: 'Outils' },
    contactTitle: { en: 'Contact', fr: 'Contact' },
    contactText: {
      en: 'For studio work, consulting or teaching inquiries, drop me a line.',
      fr: 'Pour une collaboration studio, du consulting ou de la formation, écrivez-moi.',
    },
  },
  work: {
    title: { en: 'Work', fr: 'Travaux' },
    intro: {
      en: 'Selected projects across game audio, sound design, field recording and music.',
      fr: 'Projets sélectionnés en game audio, sound design, prise de son et musique.',
    },
    filters: { en: 'Filter by discipline', fr: 'Filtrer par discipline' },
    all: { en: 'All', fr: 'Tous' },
    underNda: { en: 'Media under NDA', fr: 'Médias sous NDA' },
    previousProject: { en: 'Previous project', fr: 'Projet précédent' },
    nextProject: { en: 'Next project', fr: 'Projet suivant' },
    backToWork: { en: 'Back to work', fr: 'Retour aux travaux' },
  },
  contact: {
    title: { en: 'Contact', fr: 'Contact' },
    intro: {
      en: 'Tell me about your project — studio, consulting, teaching or music.',
      fr: 'Parlez-moi de votre projet — studio, consulting, formation ou musique.',
    },
    name: { en: 'Name', fr: 'Nom' },
    email: { en: 'Email', fr: 'Email' },
    requestType: { en: 'Request type', fr: 'Type de demande' },
    requestTypes: {
      studio: { en: 'Studio / recruitment', fr: 'Studio / recrutement' },
      consulting: { en: 'Consulting', fr: 'Consulting' },
      teaching: { en: 'Teaching', fr: 'Formation' },
      music: { en: 'Music', fr: 'Musique' },
      other: { en: 'Other', fr: 'Autre' },
    },
    message: { en: 'Message', fr: 'Message' },
    send: { en: 'Send message', fr: 'Envoyer le message' },
    orEmail: { en: 'or write to me directly at', fr: 'ou écrivez-moi directement à' },
  },
  footer: {
    legal: { en: 'Legal notice', fr: 'Mentions légales' },
    privacy: { en: 'Privacy', fr: 'Confidentialité' },
  },
  skipToContent: { en: 'Skip to main content', fr: 'Aller au contenu principal' },
} as const;

type UiDict = { [k: string]: unknown };

const walk = (acc: unknown, key: string): unknown =>
  acc !== null && typeof acc === 'object' ? (acc as UiDict)[key] : undefined;

/**
 * Traductions UI.
 * - t('nav.work')            → string (feuille { en, fr })
 * - tGroup('disciplines')    → objet { cle: { en, fr } } pour itérer
 * Clé inconnue : renvoie la clé (jamais de crash).
 */
export function useTranslations(lang: Lang) {
  function t(path: string): string {
    const node = path.split('.').reduce(walk, ui as unknown);
    if (node !== null && typeof node === 'object') {
      const leaf = node as Record<Lang, string>;
      return leaf[lang] ?? leaf[defaultLang] ?? path;
    }
    return path;
  }
  function tGroup<T = Record<string, Record<Lang, string>>>(path: string): T {
    return path.split('.').reduce(walk, ui as unknown) as T;
  }
  return { t, tGroup };
}

/** URL alternée pour le sélecteur de langue (path sans préfixe de base) */
export function alternateLangPath(path: string, target: Lang): string {
  const clean = path.replace(/^\/(fr)?/, '');
  return target === 'fr' ? `/fr${clean || '/'}` : clean || '/';
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.replace(/^\//, '').split('/');
  if (first === 'fr') return 'fr';
  return defaultLang;
}

/** Base GitHub Pages (ex. '/earlyreflect'), normalisée */
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

/** Construit une URL absolue de chemin avec base + préfixe de langue */
export function pageUrl(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = lang === 'fr' ? '/fr' : '';
  return `${BASE}${prefix}${clean === '/' && lang === 'fr' ? '/' : clean}`.replace(/\/$/, '') || '/';
}

/** URL d'une fiche projet — spec §3 : /work/{slug} en EN, /fr/travaux/{slug} en FR */
export function projectUrl(lang: Lang, slug: string): string {
  return pageUrl(lang, lang === 'fr' ? `/travaux/${slug}/` : `/work/${slug}/`);
}
