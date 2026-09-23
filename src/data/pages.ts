import type { Lang } from '../i18n/ui';

const localized = <T>(en: T, fr: T): Record<Lang, T> => ({ en, fr });

/** Contenus de pages — spec §5.4, §5.5, §5.6, §5.7 */
export const pages = {
  consulting: {
    title: localized('Consulting & teaching', 'Consulting & formation'),
    intro: localized(
      'Nearly 20 years of interactive audio experience — from pre-production to shipped AAA titles — available for your productions and your teams.',
      'Près de 20 ans d’expérience en audio interactif — de la pré-production aux titres AAA livrés — au service de vos productions et de vos équipes.',
    ),
    offers: [
      {
        title: localized('Wwise / WAAPI consulting', 'Consulting Wwise / WAAPI'),
        text: localized(
          'Tooling, automation and pipeline: custom WAAPI scripts, project hygiene, mixing architecture, team workflows.',
          'Outils, automatisation et pipeline : scripts WAAPI sur mesure, hygiène de projet, architecture de mix, workflows d’équipe.',
        ),
      },
      {
        title: localized('Audio pipeline audit', 'Audit de pipeline audio'),
        text: localized(
          'Assessment of your audio production chain — from asset creation to engine integration — with concrete recommendations.',
          'Diagnostic de votre chaîne de production audio — de la création d’assets à l’intégration moteur — avec recommandations concrètes.',
        ),
      },
      {
        title: localized('Teaching & workshops', 'Formation & workshops'),
        text: localized(
          'Interactive audio training for teams and schools: Wwise fundamentals, dynamic mixing, field recording.',
          'Formation à l’audio interactif pour équipes et écoles : fondamentaux Wwise, mix dynamique, prise de son terrain.',
        ),
      },
    ],
    teaching: {
      title: localized('Teaching', 'Enseignement'),
      text: localized(
        'Interactive audio at ISART Digital since 2017 — around 45 students a year, 9 coordinated game projects annually, two of them BAFTA-awarded.',
        'Audio interactif à ISART Digital depuis 2017 — environ 45 étudiants par an, 9 projets de jeu coordonnés chaque année, dont deux primés aux BAFTA.',
      ),
    },
    publications: {
      title: localized('Publications', 'Publications'),
      items: [
        {
          label: 'Audiokinetic blog — Tell Me Why (sound design, mixing)',
          url: 'https://blog.audiokinetic.com/', // [À VALIDER : URLs exactes des articles]
        },
        {
          label: 'Symbolic Sound interview — Beyond: Two Souls and Kyma',
          url: 'https://kyma.symbolicsound.com/', // [À VALIDER : URL exacte de l'interview]
        },
      ],
    },
  },

  music: {
    title: localized('Music', 'Musique'),
    intro: localized(
      'Yakie — electronic and ambient music: abstract hip-hop, acousmatic pieces and piano, built from field recordings. France Inter commissions, vinyl releases.',
      'Yakie — musique électronique et ambient : abstract hip-hop, pièces acousmatiques et piano, à partir de prises de terrain. Commandes France Inter, sorties vinyle.',
    ),
    sections: [
      {
        title: localized('Radio', 'Radio'),
        text: localized(
          'SACEM commission for France Inter: jingles for shows and podcasts (e.g. « 13 Novembre, l’enquête », « Le code a changé »).', // [À VALIDER : depuis 2020 ou 2021]
          'Commande SACEM pour France Inter : génériques d’émissions et de podcasts (ex. « 13 Novembre, l’enquête », « Le code a changé »).', // [À VALIDER : depuis 2020 ou 2021]
        ),
      },
      {
        title: localized('Releases', 'Sorties'),
        text: localized(
          'Hivernelle (vinyl EP, 2018, 5 tracks) and a Chapelier Fou remix (official vinyl release).',
          'Hivernelle (EP vinyle, 2018, 5 titres) et un remix de Chapelier Fou (sortie officielle vinyle).',
        ),
      },
      {
        title: localized('Award', 'Distinction'),
        text: localized(
          'Acousmatic piece awarded at the Mixage Fou 2014 contest, composed entirely from field recordings.',
          'Pièce acousmatique primée au concours Mixage Fou 2014, composée uniquement à partir de prises de terrain.',
        ),
      },
    ],
  },

  about: {
    title: localized('About', 'À propos'),
    bioShort: localized(
      'Senior sound designer in the video game industry for nearly 20 years (Quantic Dream, Ubisoft, Don’t Nod). Interactive audio teacher at ISART Digital, Wwise/Unreal consultant and trainer, composer as Yakie.',
      'Sound designer senior dans le jeu vidéo depuis près de 20 ans (Quantic Dream, Ubisoft, Don’t Nod). Enseignant en audio interactif à ISART Digital, consultant et formateur Wwise/Unreal, compositeur sous le nom Yakie.',
    ),
    timeline: [
      { years: '2019–', role: "Senior Sound Designer — Don't Nod" }, // [À VALIDER]
      { years: '2017–2018', role: 'Sound designer — Ubisoft' },
      { years: '2017–', role: 'Interactive audio teacher — ISART Digital (parallèle)' },
      { years: '2011–2016', role: 'Sound designer — Quantic Dream' },
      { years: '2009–2011', role: 'Sound designer — freelance' }, // [À VALIDER]
    ],
    skills: {
      title: localized('Skills', 'Compétences'),
      items: localized(
        'Linear audio · Interactive audio · Field and studio recording · Tools · Musician: electronic, abstract hip-hop, acousmatic, piano',
        'Audio linéaire · Audio interactif · Prise de son terrain et studio · Outils · Musicien : électronique, abstract hip-hop, acousmatique, piano',
      ),
    },
    /** Éléments du vieux CV repris pour le SEO (mots-clés indexés par Google sur /cv/) */
    affiliations: {
      title: localized('Affiliations & extra', 'Affiliations & extra'),
      items: localized(
        'Sonothèque personnelle · Membre SACEM and SACD · Fluent written and spoken English',
        'Sonothèque personnelle · Membre SACEM et SACD · Très bon niveau en anglais écrit et oral',
      ),
    },
    education: {
      title: localized('Education', 'Formation'),
      text: localized('Supinfogame — game design, sound design major (2009).', 'Supinfogame — game design, spécialité sound design (2009).'), // [À VALIDER]
    },
    cvLabel: localized('Download CV (PDF)', 'Télécharger le CV (PDF)'),
  },

  contactTypes: ['studio', 'consulting', 'teaching', 'music', 'other'] as const,
} as const;
