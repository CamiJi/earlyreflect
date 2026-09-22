#!/usr/bin/env node
/**
 * Recompose l'image carrée « clients » du hero en fond VRAIMENT transparent :
 * découpe les 5 logos depuis banniere-clients-alpha.png (détourage propre avec
 * alpha dégradé) et les dispose en 2 colonnes comme la maquette de Mathieu.
 * Usage : node scripts/compose-clients-square.mjs
 */
import sharp from 'sharp';

const SRC = 'public/images/banniere-clients-alpha.png';
const OUT = 'public/images/clients-square.webp';
const SIZE = 1024;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// 1. Découpage fixe — positions visuelles de la bannière 1920×420
//    (Don't Nod · Ubisoft · Quantic Dream · France Inter · ISART)
const CROPS = [
  { name: "dont-nod", left: 30, width: 310 },
  { name: "ubisoft", left: 355, width: 235 },
  { name: "quantic", left: 700, width: 490 },
  { name: "france-inter", left: 1260, width: 250 },
  { name: "isart", left: 1600, width: 300 },
];

const logos = [];
for (const crop of CROPS) {
  // bounding box verticale réelle dans la tranche
  const slice = await sharp(SRC).extract({ left: crop.left, top: 0, width: crop.width, height: H }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: SW, height: SH, channels: SC } = slice.info;
  let y0 = SH, y1 = 0, x0 = SW, x1 = 0;
  for (let y = 0; y < SH; y++) {
    for (let x = 0; x < SW; x++) {
      if (slice.data[(y * SW + x) * SC + 3] > 8) {
        y0 = Math.min(y0, y); y1 = Math.max(y1, y + 1);
        x0 = Math.min(x0, x); x1 = Math.max(x1, x + 1);
      }
    }
  }
  logos.push({
    name: crop.name,
    buf: await sharp(SRC)
      .extract({ left: crop.left + x0, top: y0, width: x1 - x0, height: y1 - y0 })
      .png()
      .toBuffer(),
  });
  console.log(`✓ ${crop.name} : ${x1 - x0}×${y1 - y0}px`);
}

// 3. Cibles de disposition (canvas SIZE, miroir du layout Gemini fourni par Mathieu)
//    [left, top, hauteur cible] — ordre : Don't Nod, Ubisoft, Quantic Dream, France Inter, ISART
const meta = [];
for (const logo of logos) {
  const m = await sharp(logo.buf).metadata();
  meta.push({ buf: logo.buf, w: m.width, h: m.height });
}
const [dn, ubi, qd, fi, isart] = meta;
// Hauteurs cibles : jamais au-dessus de la taille native (downscale only, pas de flou)
const targets = [
  { logo: dn, left: 100, top: 140, targetH: Math.min(170, dn.h) },       // Don't Nod — haut gauche
  { logo: ubi, left: 680, top: 140, targetH: Math.min(170, ubi.h) },     // Ubisoft — haut droite
  { logo: qd, left: 80, top: 470, targetH: Math.min(95, qd.h) },         // Quantic Dream — milieu gauche
  { logo: fi, left: 640, top: 415, targetH: Math.min(200, fi.h) },       // France Inter — milieu droite
  { logo: isart, left: 350, top: 770, targetH: Math.min(95, isart.h) },  // ISART — bas centre
];

const composites = [];
for (const t of targets) {
  const scale = t.targetH / t.logo.h;
  const resized = await sharp(t.logo.buf)
    .resize({ width: Math.round(t.logo.w * scale), height: t.targetH })
    .png()
    .toBuffer();
  composites.push({ input: resized, left: t.left, top: t.top });
}

await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(composites)
  .webp({ quality: 90 })
  .toFile(OUT);

console.log(`✓ ${OUT} (${SIZE}×${SIZE}, fond transparent, disposition maquette)`);
