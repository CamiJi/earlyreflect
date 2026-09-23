#!/usr/bin/env node
/**
 * Audit statique complet du site généré (dist/) — SEO, a11y, liens, perfs.
 * Usage : node scripts/audit.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
// Domaine attendu : lu depuis la config centrale (la bascule de domaine met l'audit à jour)
const SITE_URL = JSON.parse('"' + readFileSync('config-domain.mjs', 'utf8').match(/export const SITE_URL = '([^']+)'/)[1] + '"');
const BASE = JSON.parse('"' + readFileSync('config-domain.mjs', 'utf8').match(/export const BASE_PATH = '([^']+)'/)[1] + '"').replace(/\/$/, '');
const issues = { error: [], warn: [], info: [] };
const log = (level, where, msg) => issues[level].push({ where, msg });

// 1. Crawler : collecter tous les HTML
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const full = path.join(dir, f);
    if (statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.html')) pages.push(full);
  }
};
walk(DIST);
console.log(`📄 ${pages.length} pages HTML analysées\n`);

// 2. Checks par page
let h1Total = 0;
const urlByPage = new Map();
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  const url = rel === 'index.html' ? `${BASE}/` : `${BASE}/${rel.replace(/index\.html$/, '')}`;

  // Stubs de redirection (meta-refresh 1 ligne) : pas de checks de contenu
  if (statSync(file).size < 2000) continue;

  // Title + description (entités HTML décodées = mesure navigateur réelle)
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&');
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, '&');
  if (!title) log('error', url, 'title manquant');
  else if (title.length > 65) log('warn', url, `title ${title.length} car. (>${65}, tronqué dans la SERP)`);
  if (!desc) log('error', url, 'meta description manquante');
  else if (desc.length > 165) log('warn', url, `description ${desc.length} car. (>${165})`);
  else if (desc.length < 80) log('info', url, `description courte (${desc.length} car.)`);

  // H1 unique
  const h1s = html.match(/<h1[^>]*>/g)?.length ?? 0;
  h1Total += h1s;
  if (h1s === 0) log('error', url, 'aucun H1');
  if (h1s > 1) log('error', url, `${h1s} H1 (doit être unique)`);

  // Canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) log('error', url, 'canonical manquante');
  else if (!canonical.startsWith(SITE_URL)) log('warn', url, `canonical inattendue : ${canonical}`);

  // og:image
  if (!html.match(/<meta property="og:image"/)) log('warn', url, 'og:image manquante');

  // hreflang sur pages bilingues (hors 404)
  if (!rel.startsWith('404') && !html.match(/hreflang="en"/)) log('warn', url, 'pas de hreflang EN');

  // Images sans alt
  const imgs = [...html.matchAll(/<img[^>]*>/g)];
  for (const img of imgs) {
    if (!img[0].match(/alt="[^"]*"/)) log('error', url, 'img sans attribut alt');
    if (img[0].includes('loading="lazy"') && img[0].includes('aspect-ratio')) log('info', url, 'img lazy avec ratio — ok');
  }
  // img sans width/height (CLS)
  for (const img of imgs) {
    if (!img[0].match(/width=/) || !img[0].match(/height=/)) log('warn', url, 'img sans width/height (risque CLS)');
  }

  // JSON-LD valide ?
  const lds = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const ld of lds) {
    try { JSON.parse(ld[1]); } catch {
      log('error', url, 'JSON-LD invalide');
    }
  }

  // Skip link + lang
  if (!html.includes('href="#main"')) log('error', url, 'lien d’évitement manquant');
  if (!html.match(/<html lang="[a-z]{2}"/)) log('error', url, 'lang manquant sur <html>');

  // Poids HTML
  const size = statSync(file).size;
  if (size > 80_000) log('warn', url, `HTML ${(size / 1024).toFixed(0)} Ko (gros pour du statique)`);

  urlByPage.set(url, file);
}

// 3. Liens internes cassés
let broken = 0;
for (const [url, file] of urlByPage) {
  const html = readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (!href.startsWith(BASE)) continue; // externe / ancres / assets CDN
    if (href.includes('?') || href.includes('#')) continue;
    const clean = href.replace(BASE, '');
    const target = path.join(DIST, clean === '/' ? '' : clean.replace(/\/$/, ''), clean === '/' ? 'index.html' : 'index.html');
    const alt1 = path.join(DIST, clean.replace(/\/$/, ''), 'index.html');
    const alt2 = path.join(DIST, clean.replace(/\/$/, '') + '.html');
    const alt3 = path.join(DIST, clean.replace(/\/$/, ''), clean.split('/').at(-1) + '.html');
    if (!existsSync(target) && !existsSync(alt1) && !existsSync(alt2) && !existsSync(alt3) && !clean.endsWith('/')) {
      // dernier essai : chemin direct
      const direct = path.join(DIST, clean);
      if (!existsSync(direct)) {
        log('error', url, `lien interne cassé : ${href}`);
        broken++;
      }
    }
  }
}
if (broken === 0) log('info', '—', '✓ aucun lien interne cassé');

// 4. Perfs : poids total par page type (HTML+CSS+fonts)
const cssFiles = readdirSync(path.join(DIST, '_astro')).filter((f) => f.endsWith('.css'));
const cssSize = cssFiles.reduce((s, f) => s + statSync(path.join(DIST, '_astro', f)).size, 0);
const fonts = readdirSync(path.join(DIST, '_astro')).filter((f) => f.endsWith('.woff2'));
const fontSize = fonts.reduce((s, f) => s + statSync(path.join(DIST, '_astro', f)).size, 0);
const jsFiles = existsSync(path.join(DIST, '_astro')) ? readdirSync(path.join(DIST, '_astro')).filter((f) => f.endsWith('.js')) : [];
console.log(`⚖️  CSS total : ${(cssSize / 1024).toFixed(0)} Ko · Polices : ${(fontSize / 1024).toFixed(0)} Ko · JS : ${jsFiles.length} fichiers\n`);

// 5. Rapport
for (const level of ['error', 'warn', 'info']) {
  if (issues[level].length === 0) continue;
  console.log(`\n${level === 'error' ? '🔴' : level === 'warn' ? '🟡' : '🔵'} ${level.toUpperCase()} (${issues[level].length})`);
  const seen = new Set();
  for (const i of issues[level]) {
    const key = `${i.msg}`;
    const dedupe = level === 'info' && seen.has(key);
    if (dedupe) continue;
    seen.add(key);
    console.log(`  [${i.where}] ${i.msg}`);
    if (level !== 'error' && seen.size > 12) { console.log('  … (dédoublonné)'); break; }
  }
}
console.log(`\n— ${pages.length} pages · ${issues.error.length} erreurs · ${issues.warn.length} avertissements`);
