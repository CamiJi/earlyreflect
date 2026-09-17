#!/usr/bin/env node
/**
 * Scrape earlyreflect.com — contenu public de Mathieu (avec son accord).
 * Extrait : textes, IDs YouTube/Vimeo/SoundCloud, images → src/assets/scraped/
 * Sortie : scripts/scrape-report.json (revue humaine avant intégration)
 * Usage : npm run scrape
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = 'https://earlyreflect.com';
const PAGES = ['/', '/about/', '/audio/', '/musique/', '/cv/', '/contact/'];
const OUT_DIR = 'src/assets/scraped';
const DELAY_MS = 1500; // requêtes espacées, on est polis

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(p) {
  const url = `${BASE}${p}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'earlyreflect-refonte/1.0 (migration script)' } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return { url, html: await res.text() };
}

function extract(html, pageUrl) {
  const result = { page: pageUrl, youtube: [], vimeo: [], soundcloud: [], images: [], links: [] };

  // Embeds vidéo / audio (iframes + liens)
  for (const m of html.matchAll(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]{6,})/g)) {
    result.youtube.push(m[1]);
  }
  for (const m of html.matchAll(/player\.vimeo\.com\/video\/(\d+)/g)) {
    result.vimeo.push(m[1]);
  }
  for (const m of html.matchAll(/(?:w\.)?soundcloud\.com\/player\/\?url=([^&"']+)/g)) {
    result.soundcloud.push(decodeURIComponent(m[1]));
  }
  for (const m of html.matchAll(/https:\/\/soundcloud\.com\/[\w/-]+/g)) {
    if (!m[0].includes('/player')) result.soundcloud.push(m[0]);
  }

  // Images (WordPress.com sert via i0/i1/i2.wp.com)
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)) {
    const src = m[1];
    if (src.includes('wp.com/i/logo') || src.includes('pixel.wp.com')) continue;
    const alt = m[0].match(/alt=["']([^"']*)["']/)?.[1] ?? '';
    result.images.push({ src, alt });
  }

  // Liens sortants (articles, interviews)
  for (const m of html.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]{0,120})</g)) {
    const [, href, text] = m;
    if (!href.includes('earlyreflect.com') && !href.includes('wordpress.com')) {
      result.links.push({ href, text: text.trim() });
    }
  }

  // Paragraphes de texte (aperçu brut, à retravailler)
  const body = html.match(/<main[\s\S]*?<\/main>|<article[\s\S]*?<\/article>/)?.[0] ?? html;
  result.text = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter((t) => t.length > 20);

  // Dédoublonnage
  result.youtube = [...new Set(result.youtube)];
  result.vimeo = [...new Set(result.vimeo)];
  result.soundcloud = [...new Set(result.soundcloud)];
  return result;
}

async function downloadImage(src, dest) {
  if (existsSync(dest)) return 'cached';
  const res = await fetch(src, { headers: { 'User-Agent': 'earlyreflect-refonte/1.0' } });
  if (!res.ok) return `HTTP ${res.status}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return 'ok';
}

await mkdir(OUT_DIR, { recursive: true });
const report = [];

for (const page of PAGES) {
  try {
    const { url, html } = await fetchPage(page);
    const extracted = extract(html, page);
    report.push(extracted);

    // Téléchargement des images de la page
    for (const [i, img] of extracted.images.entries()) {
      const clean = new URL(img.src, url);
      const ext = path.extname(clean.pathname) || '.jpg';
      const name = `${page.replace(/\//g, '_') || 'home'}-${i}${ext}`;
      img.localPath = path.join(OUT_DIR, name);
      img.download = await downloadImage(clean.href, img.localPath);
      await sleep(300);
    }
    console.log(`✓ ${page} — ${extracted.youtube.length} YT, ${extracted.vimeo.length} Vimeo, ${extracted.soundcloud.length} SC, ${extracted.images.length} images`);
  } catch (err) {
    console.error(`✗ ${page} — ${err.message}`);
    report.push({ page, error: err.message });
  }
  await sleep(DELAY_MS);
}

await writeFile('scripts/scrape-report.json', JSON.stringify(report, null, 2));
console.log('\n→ Rapport : scripts/scrape-report.json');
console.log('→ Images : src/assets/scraped/');
console.log('→ Prochaine étape : revue humaine puis intégration dans src/content/projects/');
