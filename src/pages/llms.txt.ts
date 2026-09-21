import { getCollection } from 'astro:content';
import { site } from '../data/site';

/**
 * llms.txt — index pour LLMs (convention llmstxt.org).
 * Généré depuis les collections : toujours à jour avec le contenu.
 */
export async function GET() {
  const projects = (await getCollection('projects'))
    .filter((p) => p.id.startsWith('en/'))
    .sort((a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity));

  const lines = [
    `# ${site.name} — earlyreflect.com`,
    '',
    `> ${site.name} — senior sound designer in video games for nearly 20 years (Quantic Dream, Ubisoft, Don't Nod), Wwise/Unreal consultant and trainer, electronic/ambient composer as Yakie. Paris, France. Bilingual site (English default, French at /fr/).`,
    '',
    '## Pages',
    '',
    `- [Work](${site.url}/work/): portfolio grid filterable by discipline (Show Reel, Technical Sound Design, Field Recording, Music)`,
    `- [Consulting & teaching](${site.url}/consulting/): Wwise/WAAPI consulting, audio pipeline audits, interactive audio teaching at ISART Digital`,
    `- [Music](${site.url}/music/): Yakie — France Inter commissions, vinyl releases, acousmatic pieces`,
    `- [About](${site.url}/about/): bio, career timeline, skills, CV download (EN/FR)`,
    `- [Contact](${site.url}/contact/): request form + email`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const slug = p.id.replace('en/', '');
      return `- [${p.data.title}](${site.url}/work/${slug}/): ${p.data.summary} — ${p.data.studio}, ${p.data.years}, ${p.data.role}`;
    }),
    '',
    '## Machine-readable identity',
    '',
    `- [persona.json](${site.url}/persona.json): structured identity, credits, games, contact`,
    '',
    '## Site',
    '',
    'Site design & development: [Camille Aubert](https://camilleaubert.com) — AI solutions architect & lead developer.',
    '',
  ].join('\n');

  return new Response(lines, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
