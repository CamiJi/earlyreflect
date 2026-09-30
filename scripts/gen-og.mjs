#!/usr/bin/env node
/**
 * Génère public/og-default.webp (1200×630) — image Open Graph par défaut.
 * Fond sombre, motif « early reflections » en dégradé, nom du site.
 * Usage : node scripts/gen-og.mjs (une fois, résultat committé)
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

const bars = [
  { x: 90, w: 14, h: 220, o: 1 },
  { x: 138, w: 11, h: 158, o: 0.68 },
  { x: 184, w: 9, h: 113, o: 0.5 },
  { x: 232, w: 7.5, h: 79, o: 0.36 },
  { x: 286, w: 6.5, h: 55, o: 0.24 },
  { x: 348, w: 5.5, h: 38, o: 0.15 },
  { x: 419, w: 4.5, h: 24, o: 0.08 },
];

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="accent"><stop stop-color="#2CCDF2"/><stop offset="1" stop-color="#FF7A1F"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="#161618"/>
  ${bars
    .map((b) => `<rect x="${b.x}" y="${(H - b.h) / 2}" width="${b.w}" height="${b.h}" rx="${b.w / 2}" fill="url(#accent)" opacity="${b.o}"/>`)
    .join('\n  ')}
  <text x="${W - 90}" y="${H / 2 - 60}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="#ECECEC">Mathieu Fiorentini</text>
  <text x="${W - 90}" y="${H / 2 + 10}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#A1A1A6">Senior sound designer · Wwise consultant · Composer</text>
  <text x="${W - 90}" y="${H - 70}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#A1A1A6" opacity="0.7">earlyreflect.com</text>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile('public/og-default.webp');
console.log('✓ public/og-default.webp généré');
