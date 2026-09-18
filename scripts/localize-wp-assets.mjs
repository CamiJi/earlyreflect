#!/usr/bin/env node
/**
 * Rapatrie les assets de l'ancien site WordPress vers le nouveau site (retour V1 §1.3/§1.4).
 * Télécharge les fichiers d'ORIGINE (haute définition), génère les variantes WebP
 * responsives dans public/images/, et met à jour wp-assets.json (srcset local).
 * Usage : node scripts/localize-wp-assets.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = 'public/images';
const WIDTHS = [300, 768, 1024, 1440, 1920];
const QUALITY = 82;

const json = await readFile('src/data/wp-assets.json', 'utf8');
const assets = JSON.parse(json);

await mkdir(OUT_DIR, { recursive: true });

for (const [key, info] of Object.entries(assets)) {
  const base = path.join(OUT_DIR, key);

  // 1. Télécharger l'original (cache disque)
  const origPath = `${base}_orig${path.extname(info.url)}`;
  if (!existsSync(origPath)) {
    const res = await fetch(info.url);
    if (!res.ok) {
      console.error(`✗ ${key}: HTTP ${res.status}`);
      continue;
    }
    await writeFile(origPath, Buffer.from(await res.arrayBuffer()));
  }

  // 2. Variantes WebP responsives, limitées à la largeur d'origine
  const usable = WIDTHS.filter((w) => w <= info.width);
  const variants = [];
  for (const w of [...usable, info.width]) {
    const file = `${base}_${w}.webp`;
    if (!existsSync(file)) {
      await sharp(origPath).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(file);
    }
    if (!variants.some((v) => v.path === file)) {
      variants.push({ width: Math.min(w, info.width), path: `/${OUT_DIR.replace('public/', '')}/${path.basename(file)}` });
    }
  }

  // 3. Mise à jour de l'entrée : srcset local
  info.localVariants = variants.sort((a, b) => a.width - b.width);
  info.localSrc = info.localVariants.at(-1).path;
  console.log(`✓ ${key}: ${variants.length} variantes WebP`);
}

await writeFile('src/data/wp-assets.json', JSON.stringify(assets, null, 2) + '\n');
console.log('→ src/data/wp-assets.json mis à jour (assets locaux)');
