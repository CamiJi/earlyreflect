#!/usr/bin/env node
/**
 * Génère les fichiers de contenu projets (EN + FR) depuis les données §9 de la spec,
 * enrichies du scrape (scripts/scrape-report.json).
 * Usage : node scripts/gen-content.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';

const SC = 'https://api.soundcloud.com/tracks';

/** [slug, données partagées EN/FR] — copy à affiner par Mathieu */
const projects = [
  {
    slug: 'showreel-2014-2025',
    en: {
      title: 'Showreel 2014–2025',
      studio: 'Various studios',
      years: '2014–2025',
      role: 'Sound design, integration',
      summary: 'Latest demo reel. All sounds captured under real-time conditions.',
      body: 'All sounds in this demo were captured under real-time conditions. I was responsible for the design and implementation of all SFX, foley and ambience, except where shared responsibility is noted in the titles.',
    },
    fr: {
      title: 'Showreel 2014–2025',
      studio: 'Studios divers',
      years: '2014–2025',
      role: 'Sound design, intégration',
      summary: 'Dernière démo. Tous les sons captés en conditions temps réel.',
      body: 'Tous les sons de cette démo ont été captés en conditions temps réel. J’ai assuré le design et l’intégration des SFX, foley et ambiances, sauf mention contraire dans les titres.',
    },
    data: {
      disciplines: ['show-reel'],
      mediaUrl: 'https://www.youtube.com/watch?v=ng6NrgjAa6M',
      mediaCaption: { en: 'Demo reel 2014–2025', fr: 'Démo 2014–2025' },
      featured: true,
      order: 1,
    },
  },
  {
    slug: 'demo-reel-2009-2014',
    en: {
      title: 'First demo reel 2009–2014',
      studio: 'Various studios',
      years: '2009–2014',
      role: 'Sound design',
      summary: 'First demo reel, kept as archive.',
      body: 'My very first demo reel, including projects from 2009 to 2014. Kept as archive.',
    },
    fr: {
      title: 'Première démo 2009–2014',
      studio: 'Studios divers',
      years: '2009–2014',
      role: 'Sound design',
      summary: 'Première démo, conservée en archive.',
      body: 'Ma toute première démo, avec des projets de 2009 à 2014. Conservée en archive.',
    },
    data: {
      disciplines: ['show-reel'],
      mediaUrl: 'https://vimeo.com/86844607',
      featured: false,
      order: 2,
    },
  },
  {
    slug: 'aphelion',
    en: {
      title: 'Aphelion',
      studio: "Don't Nod",
      years: 'In production',
      role: 'Senior audio designer — VO production coordination',
      summary: 'Unannounced project. Media under NDA.',
      body: 'Coordination of VO production (internal teams, recording studio, mocap, narrative design). [À VALIDER : communicable ?]',
    },
    fr: {
      title: 'Aphelion',
      studio: "Don't Nod",
      years: 'En production',
      role: 'Senior audio designer — coordination production VO',
      summary: 'Projet non annoncé. Médias sous NDA.',
      body: 'Coordination de la production VO (équipes internes, studio d’enregistrement, mocap, narrative design). [À VALIDER : communicable ?]',
    },
    data: { disciplines: ['technical-sound-design'], nda: { active: true }, featured: false, order: 3 },
  },
  {
    slug: 'banishers-ghosts-of-new-eden',
    en: {
      title: 'Banishers: Ghosts of New Eden',
      studio: "Don't Nod / Focus",
      years: '2020–2024',
      role: 'Senior sound designer, lead mix',
      summary: 'Pre-production to shipping: sound design, field recording, R&D, object-based mixing, team lead.',
      body: 'Artistic and technical pre-production, sound design, field recording, R&D, integration and object-based mixing. Led a team of four sound designers for six months of mixing: guidelines and review processes. [À VALIDER : années]',
    },
    fr: {
      title: 'Banishers: Ghosts of New Eden',
      studio: "Don't Nod / Focus",
      years: '2020–2024',
      role: 'Sound designer senior, lead mix',
      summary: 'De la pré-prod à la livraison : sound design, field recording, R&D, mix orienté objet, encadrement.',
      body: 'Pré-production artistique et technique, sound design, field recording, R&D, intégration et mix orienté objet. Encadrement de 4 sound designers pendant 6 mois de mix : guidelines et process de review. [À VALIDER : années]',
    },
    data: { disciplines: ['technical-sound-design'], featured: true, order: 4 },
  },
  {
    slug: 'tell-me-why',
    en: {
      title: 'Tell Me Why',
      studio: "Don't Nod / Microsoft",
      years: '2019–2020',
      role: 'Senior sound designer',
      summary: 'Pre-production, sound design, field recording, R&D, integration.',
      body: 'Pre-production, sound design, field recording, R&D and integration. Documented in a two-part audio diary on the Audiokinetic blog.',
    },
    fr: {
      title: 'Tell Me Why',
      studio: "Don't Nod / Microsoft",
      years: '2019–2020',
      role: 'Sound designer senior',
      summary: 'Pré-production, sound design, field recording, R&D, intégration.',
      body: 'Pré-production, sound design, field recording, R&D et intégration. Retour d’expérience en deux volets sur le blog Audiokinetic.',
    },
    data: {
      disciplines: ['technical-sound-design'],
      featured: true,
      order: 5,
      links: [
        { label: 'Audiokinetic blog — sound design', url: 'https://blog.audiokinetic.com/fr/tell-me-why-audio-diary-part-3-sound-design/' },
        { label: 'Audiokinetic blog — mixing', url: 'https://blog.audiokinetic.com/fr/tell-me-why-audio-diary-part-4-mixing-and-mastering/' },
      ],
    },
  },
  {
    slug: 'watch-dogs-legion',
    en: {
      title: 'Watch Dogs: Legion',
      studio: 'Ubisoft',
      years: '2017–2018',
      role: 'Sound designer',
      summary: 'Sound design, field recording, R&D, integration.',
      body: 'Sound design, field recording, R&D and integration.',
    },
    fr: {
      title: 'Watch Dogs: Legion',
      studio: 'Ubisoft',
      years: '2017–2018',
      role: 'Sound designer',
      summary: 'Sound design, field recording, R&D, intégration.',
      body: 'Sound design, field recording, R&D et intégration.',
    },
    data: { disciplines: ['technical-sound-design'], featured: false, order: 6 },
  },
  {
    slug: 'watch-dogs-2-dlc',
    en: {
      title: 'Watch Dogs 2 (DLC)',
      studio: 'Ubisoft',
      years: '2016',
      role: 'Audio designer',
      summary: 'Audio design and integration (DLC).',
      body: 'Audio design and integration for the DLC.',
    },
    fr: {
      title: 'Watch Dogs 2 (DLC)',
      studio: 'Ubisoft',
      years: '2016',
      role: 'Audio designer',
      summary: 'Audio design et intégration (DLC).',
      body: 'Audio design et intégration sur le DLC.',
    },
    data: { disciplines: ['technical-sound-design'], featured: false, order: 7 },
  },
  {
    slug: 'detroit-become-human',
    en: {
      title: 'Detroit: Become Human',
      studio: 'Quantic Dream',
      years: '2013–2016',
      role: 'Sound designer',
      summary: 'Pre-production, audio design and implementation, dynamic mixing, field recording.',
      body: 'Pre-production, audio design and implementation, dynamic mixing and field recording on Quantic Dream’s narrative flagship.',
    },
    fr: {
      title: 'Detroit: Become Human',
      studio: 'Quantic Dream',
      years: '2013–2016',
      role: 'Sound designer',
      summary: 'Pré-production, audio design et implémentation, mix dynamique, field recording.',
      body: 'Pré-production, audio design et implémentation, mix dynamique et field recording sur le jeu narratif de Quantic Dream.',
    },
    data: { disciplines: ['technical-sound-design'], featured: true, order: 8 },
  },
  {
    slug: 'beyond-two-souls',
    en: {
      title: 'Beyond: Two Souls',
      studio: 'Quantic Dream',
      years: '2011–2013',
      role: 'Sound designer',
      summary: 'Sound design, implementation, dynamic mixing, cinematic mixing.',
      body: 'Sound design, implementation, dynamic mixing and cinematic mixing. Interviewed by Symbolic Sound about the Kyma-based work on the game.',
    },
    fr: {
      title: 'Beyond: Two Souls',
      studio: 'Quantic Dream',
      years: '2011–2013',
      role: 'Sound designer',
      summary: 'Sound design, implémentation, mix dynamique, mix des cinématiques.',
      body: 'Sound design, implémentation, mix dynamique et mix des cinématiques. Interview par Symbolic Sound au sujet du travail avec Kyma sur le jeu.',
    },
    data: {
      disciplines: ['technical-sound-design'],
      featured: true,
      order: 9,
      links: [{ label: 'Symbolic Sound interview', url: 'http://news.symbolicsound.com/2013/10/sound-design-for-beyond-two-souls/' }],
    },
  },
  {
    slug: 'heavy-rain',
    en: {
      title: 'Heavy Rain',
      studio: 'Quantic Dream / Sony',
      years: '2009',
      role: 'Sound designer',
      summary: 'Sound design, implementation.',
      body: 'Sound design and implementation.',
    },
    fr: {
      title: 'Heavy Rain',
      studio: 'Quantic Dream / Sony',
      years: '2009',
      role: 'Sound designer',
      summary: 'Sound design, implémentation.',
      body: 'Sound design et implémentation.',
    },
    data: { disciplines: ['technical-sound-design'], featured: false, order: 10 },
  },
  {
    slug: 'ones',
    en: {
      title: 'Ones',
      studio: 'Supinfogame',
      years: '2009',
      role: 'Sound designer',
      summary: 'Student project — sound design. [À VALIDER : fiche ou CV seulement]',
      body: 'Student project at Supinfogame — sound design. [À VALIDER : fiche ou CV seulement]',
    },
    fr: {
      title: 'Ones',
      studio: 'Supinfogame',
      years: '2009',
      role: 'Sound designer',
      summary: 'Projet étudiant — sound design. [À VALIDER : fiche ou CV seulement]',
      body: 'Projet étudiant à Supinfogame — sound design. [À VALIDER : fiche ou CV seulement]',
    },
    data: { disciplines: ['technical-sound-design'], featured: false, order: 11 },
  },
  {
    slug: 'field-and-studio-recordings',
    en: {
      title: 'Field and studio recordings',
      studio: 'Personal work',
      years: '2010–2016',
      role: 'Field recording, audio design',
      summary: 'Field and studio recording selection. [À VALIDER : ajouter des prises plus récentes ?]',
      body: 'A selection of field and studio recordings, plus an audio design example. [À VALIDER : these tracks date from 2016 or before — add more recent takes?]',
    },
    fr: {
      title: 'Prises de son terrain et studio',
      studio: 'Travail personnel',
      years: '2010–2016',
      role: 'Prise de son, audio design',
      summary: 'Sélection de prises de son terrain et studio. [À VALIDER : ajouter des prises plus récentes ?]',
      body: 'Une sélection de prises de son terrain et studio, plus un exemple d’audio design. [À VALIDER : ces pistes datent de 2016 ou avant — ajouter des prises plus récentes ?]',
    },
    data: {
      disciplines: ['field-recording'],
      featured: false,
      order: 12,
      secondaryMedia: [
        { url: `${SC}/287292797`, caption: { en: 'Field recording', fr: 'Prise de son terrain' } },
        { url: `${SC}/278535360`, caption: { en: 'Field recording', fr: 'Prise de son terrain' } },
        { url: `${SC}/223866021`, caption: { en: 'Field recording', fr: 'Prise de son terrain' } },
        { url: `${SC}/223868384`, caption: { en: 'Audio design [À VALIDER : field recording ou technical SD]', fr: 'Audio design [À VALIDER : field recording ou technical SD]' } },
      ],
    },
  },
  {
    slug: 'france-inter',
    en: {
      title: 'France Inter — opening titles',
      studio: 'France Inter (SACEM commission)',
      years: '2020–',
      role: 'Composer',
      summary: 'Opening titles for radio shows and podcasts. [À VALIDER : depuis 2020 ou 2021 ?]',
      body: 'Since 2020, my music opens some France Inter shows and podcasts, such as « 13 Novembre, l’enquête » and « Le code a changé ». [À VALIDER : 2020 ou 2021]',
    },
    fr: {
      title: 'France Inter — génériques',
      studio: 'France Inter (commande SACEM)',
      years: '2020–',
      role: 'Compositeur',
      summary: 'Génériques d’émissions et de podcasts. [À VALIDER : depuis 2020 ou 2021 ?]',
      body: 'Depuis 2020, ma musique ouvre certaines émissions et podcasts de France Inter, comme « 13 Novembre, l’enquête » ou « Le code a changé ». [À VALIDER : 2020 ou 2021]',
    },
    data: {
      disciplines: ['music'],
      featured: true,
      order: 13,
      links: [{ label: '13 Novembre, l’enquête', url: 'https://www.franceinter.fr/emissions/13-novembre-l-enquete' }],
    },
  },
  {
    slug: 'hivernelle-ep',
    en: {
      title: 'Hivernelle (EP)',
      studio: 'Yakie',
      years: '2018',
      role: 'Composer, producer',
      summary: 'First vinyl EP — five tracks forming a narrative whole.',
      body: 'My first EP, released on vinyl in 2018. Hivernelle contains five tracks that form a narrative whole: bursts of piano over a powerful bassline bed and minimalist, incisive and groovy beats. [À FOURNIR : pochette, lien d’écoute ou d’achat]',
    },
    fr: {
      title: 'Hivernelle (EP)',
      studio: 'Yakie',
      years: '2018',
      role: 'Compositeur, producteur',
      summary: 'Premier EP vinyle — cinq titres qui forment un tout narratif.',
      body: 'Mon premier EP, sorti en vinyle en 2018. Hivernelle contient cinq titres qui forment un tout narratif : des touches de piano sur une ligne de basse puissante et des beats minimalistes, incisifs et groovy. [À FOURNIR : pochette, lien d’écoute ou d’achat]',
    },
    data: { disciplines: ['music'], featured: true, order: 14 },
  },
  {
    slug: 'chapelier-fou-remix',
    en: {
      title: "Chapelier Fou — Yakie's remix",
      studio: 'Yakie',
      years: '2015',
      role: 'Remixer',
      summary: 'Funky electro remix, officially released on vinyl.',
      body: 'A funky electro remix of Chapelier Fou’s « Tea Tea Tea », officially released on vinyl.',
    },
    fr: {
      title: 'Chapelier Fou — remix Yakie',
      studio: 'Yakie',
      years: '2015',
      role: 'Remixeur',
      summary: 'Remix electro funky, sorti officiellement en vinyle.',
      body: 'Un remix electro funky de « Tea Tea Tea » de Chapelier Fou, sorti officiellement en vinyle.',
    },
    data: {
      disciplines: ['music'],
      featured: false,
      order: 15,
      mediaUrl: `${SC}/168901916`,
      links: [
        { label: 'Chapelier Fou — Bandcamp', url: 'https://chapelierfou.bandcamp.com/' },
        { label: 'Vinyle (ici d’ailleurs)', url: 'http://www.icidailleurs.com/index.php?route=product/product&keyword=fuses&category_id=0&description=1&model=1&product_id=480' },
      ],
    },
  },
  {
    slug: 'mixage-fou-2014',
    en: {
      title: 'Mixage Fou 2014 — award',
      studio: 'Mixage Fou',
      years: '2014',
      role: 'Composer',
      summary: 'Award-winning acousmatic piece, 100% composed from field recordings.',
      body: 'This acousmatic piece won a prize at the Mixage Fou 2014 contest. It is 100% composed from field recording takes.',
    },
    fr: {
      title: 'Mixage Fou 2014 — prix',
      studio: 'Mixage Fou',
      years: '2014',
      role: 'Compositeur',
      summary: 'Pièce acousmatique primée, 100% composée à partir de prises de terrain.',
      body: 'Cette pièce acousmatique a remporté un prix au concours Mixage Fou 2014. Elle est composée à 100 % à partir de prises de terrain.',
    },
    data: {
      disciplines: ['music', 'field-recording'],
      featured: false,
      order: 16,
      mediaUrl: `${SC}/223864848`,
      links: [{ label: 'Mixage Fou 2014', url: 'http://www.mixagefou.com/mixagefou2014/' }],
    },
  },
  {
    slug: 'yakie-demo',
    en: {
      title: 'Yakie — demo',
      studio: 'Yakie',
      years: '2016–',
      role: 'Composer, producer',
      summary: 'Demo playlist and video. More tracks on SoundCloud.',
      body: 'Demo playlist (private link) and a video. More tracks on SoundCloud.',
    },
    fr: {
      title: 'Yakie — démo',
      studio: 'Yakie',
      years: '2016–',
      role: 'Compositeur, producteur',
      summary: 'Playlist de démo et vidéo. D’autres titres sur SoundCloud.',
      body: 'Playlist de démo (lien privé) et une vidéo. D’autres titres sur SoundCloud.',
    },
    data: {
      disciplines: ['music'],
      featured: true,
      order: 17,
      mediaUrl: 'https://soundcloud.com/yakiemusic/sets/demo-musique/s-NUwwKBNu3kI',
      secondaryMedia: [{ url: 'https://www.youtube.com/watch?v=ckwDP3JAY1g', caption: { en: 'Video', fr: 'Vidéo' } }],
      links: [{ label: 'SoundCloud (yakieohmi)', url: 'https://soundcloud.com/yakieohmi' }],
    },
  },
];

function caption(c, lang) {
  return typeof c === 'string' ? c : c[lang];
}

function frontmatter(d, lang, slug) {
  const lines = [];
  const title = d.title;
  lines.push(`title: "${title.replace(/"/g, '\\"')}"`);
  if (d.keyArt) lines.push(`keyArt: "${d.keyArt}"`, `keyArtAlt: "${(d.keyArtAlt ?? '').replace(/"/g, '\\"')}"`);
  lines.push(`studio: "${d.studio.replace(/"/g, '\\"')}"`);
  lines.push(`years: "${d.years}"`);
  lines.push(`role: "${d.role.replace(/"/g, '\\"')}"`);
  if (d.platforms) lines.push(`platforms: "${d.platforms}"`);
  lines.push(`summary: "${d.summary.replace(/"/g, '\\"')}"`);
  if (d.mediaUrl) {
    lines.push(`mediaUrl: "${d.mediaUrl}"`);
    if (d.mediaCaption) lines.push(`mediaCaption: "${caption(d.mediaCaption, lang).replace(/"/g, '\\"')}"`);
  }
  if (d.secondaryMedia?.length) {
    lines.push('secondaryMedia:');
    for (const m of d.secondaryMedia) {
      lines.push(`  - url: "${m.url}"`);
      const cap = caption(m.caption, lang);
      if (cap) lines.push(`    caption: "${cap.replace(/"/g, '\\"')}"`);
    }
  }
  if (d.links?.length) {
    lines.push('links:');
    for (const link of d.links) {
      lines.push(`  - label: "${link.label.replace(/"/g, '\\"')}"`);
      lines.push(`    url: "${link.url}"`);
    }
  }
  if (d.nda) lines.push(`nda:\n  active: true${d.nda.note ? `\n  note: "${d.nda.note}"` : ''}`);
  lines.push(`featured: ${d.featured ? 'true' : 'false'}`);
  lines.push(`order: ${d.order}`);
  lines.push(`disciplines: [${d.disciplines.map((x) => `"${x}"`).join(', ')}]`);
  return lines.join('\n');
}

await mkdir('src/content/projects/en', { recursive: true });
await mkdir('src/content/projects/fr', { recursive: true });

for (const project of projects) {
  for (const lang of ['en', 'fr']) {
    const d = project.data;
    const copy = project[lang];
    const fm = frontmatter({ ...copy, ...d, keyArt: d.keyArt }, lang, project.slug);
    const body = `---\n${fm}\n---\n\n${copy.body}\n`;
    await writeFile(`src/content/projects/${lang}/${project.slug}.md`, body);
  }
}
console.log(`✓ ${projects.length} projets × 2 langues générés dans src/content/projects/`);
