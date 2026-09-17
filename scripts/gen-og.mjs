#!/usr/bin/env node
/**
 * Génère public/og-default.webp (1200×630) — image Open Graph par défaut.
 * Fond paper, motif « early reflections » signal, nom du site.
 * Usage : node scripts/gen-og.mjs (une fois, résultat committé)
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

const bars = [
  { x: 90, w: 14, o: 1 },
  { x: 140, w: 11, o: 0.75 },
  { x: 185, w: 9, o: 0.55 },
  { x: 235, w: 7.5, o: 0.38 },
  { x: 290, w: 6, o: 0.24 },
  { x: 352, w: 5, o: 0.12 },
];

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#f6f7f5"/>
  ${bars
    .map((b) => `<rect x="${b.x}" y="${H / 2 - 110}" width="${b.w}" height="220" rx="${b.w / 2}" fill="#2e46c8" opacity="${b.o}"/>`)
    .join('\n  ')}
  <text x="${W - 90}" y="${H / 2 - 60}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="#1e2226">Mathieu Fiorentini</text>
  <text x="${W - 90}" y="${H / 2 + 10}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#5e656c">Senior sound designer · Wwise consultant · Composer</text>
  <text x="${W - 90}" y="${H - 70}" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#5e656c" opacity="0.7">earlyreflect.com</text>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile('public/og-default.webp');
console.log('✓ public/og-default.webp généré');
