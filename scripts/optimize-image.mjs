#!/usr/bin/env node
/**
 * Optimise une image brute (PNG/JPG/WebP — n'importe quelle taille) pour le web :
 * → public/images/<nom>.webp (1920px max, qualité 82) + variantes srcset 300/768/1280
 * Usage : node scripts/optimize-image.mjs <source> [nom-final]
 * Exemple : node scripts/optimize-image.mjs ~/Downloads/Banishers_KeyArt.png banishers-key-art
 */
import sharp from 'sharp';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const [input, nameArg] = process.argv.slice(2);
if (!input) {
  console.error('Usage : node scripts/optimize-image.mjs <image-source> [nom-final-sans-extension]');
  process.exit(1);
}

const name = (nameArg || path.parse(input).name)
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // accents
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const WIDTHS = [300, 768, 1280, 1920];
const QUALITY = 82;

mkdirSync('public/images', { recursive: true });

const source = sharp(input);
const meta = await source.metadata();
const maxW = Math.min(1920, meta.width);

const main = await source.clone()
  .resize({ width: maxW, withoutEnlargement: true })
  .webp({ quality: QUALITY })
  .toFile(`public/images/${name}.webp`);

const variants = [];
for (const w of WIDTHS.filter((w) => w < maxW)) {
  await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(`public/images/${name}_${w}.webp`);
  variants.push(`${w}w`);
}

const kb = (statSync(`public/images/${name}.webp`).size / 1024).toFixed(0);
console.log(`✓ public/images/${name}.webp — ${main.width}×${main.height}, ${kb} Ko`);
console.log(`
→ Dans la fiche projet :
  keyArt: "/images/${name}.webp"
  keyArtAlt: "Key art de ${name} (cédés par l'éditeur — usage portfolio)"
`);
