export const site = {
  name: 'Mathieu Fiorentini',
  url: 'https://camijii.github.io/earlyreflect',
  /** URL de production finale (après bascule DNS) : https://earlyreflect.com */
  productionUrl: 'https://earlyreflect.com',
  showreelYouTubeId: 'ng6NrgjAa6M',
  cvPdf: { en: '/earlyreflect/documents/cv-en.pdf', fr: '/earlyreflect/documents/cv-fr.pdf' },
  socials: [
    { label: 'SoundCloud (Yakie)', url: 'https://soundcloud.com/yakiemusic' },
    { label: 'YouTube', url: 'https://www.youtube.com/results?search=query' }, // [À VALIDER : chaîne YT de Mathieu]
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mathieu-fiorentini-8b18b045' },
  ],
  /** [À VALIDER : lesquels] — Bandcamp à ajouter si retenu */
  socialsTodo: ['Bandcamp'],
  /** Formspree — Mathieu crée le compte gratuit et remplace par son form ID */
  formspreeId: 'YOUR_FORM_ID',
  email: 'mathieu.fiorentini@gmail.com',
  credits: [
    'Quantic Dream',
    'Ubisoft',
    "Don't Nod",
    'Focus Entertainment',
    'France Inter',
    'ISART Digital',
  ],
  tools: ['Wwise', 'Unreal Engine', 'Reaper', 'Pro Tools', 'Soundminer', 'Kyma'],
} as const;
