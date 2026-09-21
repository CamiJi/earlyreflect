import { getCollection, render } from 'astro:content';
import { site } from '../data/site';

/**
 * llms-full.txt — contenu complet des pages et projets en markdown, pour LLMs.
 */
export async function GET() {
  const projects = (await getCollection('projects'))
    .filter((p) => p.id.startsWith('en/'))
    .sort((a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity));

  const blocks: string[] = [];
  for (const p of projects) {
    const slug = p.id.replace('en/', '');
    const { Content } = await render(p);
    const { strip } = await import('node:util');
    // le body markdown brut est disponible via p.body
    blocks.push(
      [
        `## ${p.data.title}`,
        '',
        `- Source: ${site.url}/work/${slug}/`,
        `- Studio: ${p.data.studio} · Years: ${p.data.years} · Role: ${p.data.role}`,
        `- Disciplines: ${p.data.disciplines.join(', ')}`,
        '',
        p.body ?? '',
      ].join('\n'),
    );
  }

  const out = [
    `# ${site.name} — earlyreflect.com (full content)`,
    '',
    `> ${site.name} — senior sound designer in video games for nearly 20 years (Quantic Dream, Ubisoft, Don't Nod), Wwise/Unreal consultant and trainer, composer as Yakie. Paris, France. English content below; French versions at /fr/.`,
    '',
    '## About',
    '',
    'Mathieu Fiorentini is a game sound designer and composer based in Paris. After Supinfogame (2009), he spent 15+ years shipping narrative games: Heavy Rain (Quantic Dream/Sony), Beyond: Two Souls, Detroit: Become Human (Quantic Dream), Watch Dogs 2 DLC and Watch Dogs: Legion (Ubisoft), Tell Me Why (Don\'t Nod/Microsoft), Banishers: Ghosts of New Eden (Don\'t Nod/Focus), and the in-production Aphelion (Don\'t Nod).',
    'His strongest skills: sound design (SFX, foley, ambience), engine integration and audio systems (Wwise, Unreal), dynamic/object-based mixing, field recording, and team leadership.',
    'He teaches interactive audio at ISART Digital since 2017 (~45 students/year, 9 coordinated game projects annually, two BAFTA-awarded). As a consultant he covers Wwise/WAAPI tooling, audio pipeline audits and workshops.',
    'As Yakie he composes electronic/ambient music: France Inter radio commissions (SACEM, since 2020), the vinyl EP Hivernelle (2018), an official vinyl remix of Chapelier Fou, and an award-winning acousmatic piece at Mixage Fou 2014 built entirely from field recordings.',
    '',
    ...blocks,
    '',
    '## Contact',
    '',
    `- Form: ${site.url}/contact/`,
    `- Email: ${site.email}`,
    `- LinkedIn: https://www.linkedin.com/in/mathieu-fiorentini-8b18b045`,
    `- SoundCloud: https://soundcloud.com/yakiemusic`,
    `- CV (PDF): ${site.url}/documents/cv-en.pdf (EN) · ${site.url}/documents/cv-fr.pdf (FR)`,
    '',
  ].join('\n');

  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
