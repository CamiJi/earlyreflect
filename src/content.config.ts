import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection « Projet » — spec §4.1
 * Fichiers : src/content/projects/{en|fr}/{slug}.md
 * La discipline est multi-valuée ; le tri suit `order` sinon années décroissantes.
 */
const projects = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/projects' }),
  schema: z.object({
    /** Titre = nom du jeu ou de l'œuvre (frontmatter title) */
    title: z.string(),
    /** Visuel principal — key art 16:9, min. 1600px de large (obligatoire sauf NDA pur) */
    keyArt: z.string().optional(),
    keyArtAlt: z.string().optional(),
    studio: z.string(),
    /** ex. "2020–2024" — texte court */
    years: z.string(),
    role: z.string(),
    platforms: z.string().optional(),
    /** ≤ 160 car. — affiché dans la grille et en meta description */
    summary: z.string().max(200),
    /** Média principal : YouTube / Vimeo / SoundCloud URL ou fichier audio */
    mediaUrl: z.string().optional(),
    /** Légende du média principal */
    mediaCaption: z.string().optional(),
    /** Médias secondaires (répéteur) */
    secondaryMedia: z.array(z.object({ url: z.string(), caption: z.string().optional() })).default([]),
    /** Liens (répéteur libellé + URL) : articles, interviews, store */
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    /** Mention NDA — affiche « Médias sous NDA » à la place du lecteur */
    nda: z.object({ active: z.boolean().default(false), note: z.string().optional() }).default({ active: false }),
    /** Apparaît dans la sélection de la home (6 à 9 max, spec §5.1) */
    featured: z.boolean().default(false),
    /** Tri manuel ; sinon tri par années décroissantes */
    order: z.number().optional(),
    /** Taxonomie « Discipline » — 4 termes, multi-valuée */
    disciplines: z.array(
      z.enum(['show-reel', 'technical-sound-design', 'field-recording', 'music']),
    ).min(1),
  }),
});

export const collections = { projects };
