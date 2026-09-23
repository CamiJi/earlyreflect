// @ts-ignore — fichier JS pur partagé avec astro.config.mjs
import { SITE_URL, BASE_PATH } from '../../config-domain.mjs';

export const site = {
  name: 'Mathieu Fiorentini',
  /** Dérivé de config-domain.mjs — la bascule de domaine n'édite que ce fichier-là.
   *  BASE_PATH '/' (domaine final) ne doit PAS créer de double slash. */
  url: `${SITE_URL}${BASE_PATH === '/' ? '' : BASE_PATH}`,
  /** URL de production finale (après bascule DNS) : https://earlyreflect.com */
  productionUrl: 'https://earlyreflect.com',
  showreelYouTubeId: 'ng6NrgjAa6M',
  cvPdf: {
    en: `${BASE_PATH.replace(/\/$/, '')}/documents/cv-en.pdf`,
    fr: `${BASE_PATH.replace(/\/$/, '')}/documents/cv-fr.pdf`,
  },
  socials: [
    { label: 'SoundCloud (Yakie)', url: 'https://soundcloud.com/yakiemusic' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mathieu-fiorentini-681441344' },
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
