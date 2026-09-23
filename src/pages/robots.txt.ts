import { site } from '../data/site';

/**
 * robots.txt généré — l'URL du sitemap suit automatiquement la config de domaine.
 */
export function GET() {
  const out = [
    '# Robots — earlyreflect.com',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI crawlers — explicitement autorisés (visibilité IA voulue)',
    'User-agent: GPTBot',
    'Allow: /',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    'User-agent: ChatGPT-User',
    'Allow: /',
    'User-agent: ClaudeBot',
    'Allow: /',
    'User-agent: Claude-User',
    'Allow: /',
    'User-agent: Claude-SearchBot',
    'Allow: /',
    'User-agent: PerplexityBot',
    'Allow: /',
    'User-agent: Google-Extended',
    'Allow: /',
    'User-agent: Applebot-Extended',
    'Allow: /',
    'User-agent: Amazonbot',
    'Allow: /',
    'User-agent: meta-externalagent',
    'Allow: /',
    '',
    '# Index pour LLMs',
    '# Voir : /llms.txt (index) · /llms-full.txt (contenu complet) · /persona.json (identité structurée)',
    '',
    `Sitemap: ${site.url}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
