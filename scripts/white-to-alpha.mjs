#!/usr/bin/env node
/**
 * Détourage du fond blanc de la bannière clients (retour V2 : fond transparent).
 * Méthode :
 *   1. flood-fill depuis les bords de l'image sur les pixels quasi-blancs
 *      → seul le fond CONNECTÉ est retiré (le blanc interne des logos est préservé)
 *   2. anti-aliasing : les pixels de la frontière reçoivent un alpha calculé par
 *      "dé-mixage" du blanc : alpha = 255 - min(R,G,B), couleur = (c - (1-a)*255)/a
 * Usage : node scripts/white-to-alpha.mjs <input> <output>
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/white-to-alpha.mjs <input> <output>');
  process.exit(1);
}

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const px = (x, y, ch) => data[(y * W + x) * C + ch];

const isWhite = (x, y) => {
  const i = (y * W + x) * C;
  return data[i] >= 240 && data[i + 1] >= 240 && data[i + 2] >= 240;
};

// 1. Flood-fill BFS depuis tous les pixels de bord blancs
const visited = new Uint8Array(W * H);
const queue = [];
for (let x = 0; x < W; x++) {
  for (const y of [0, H - 1]) {
    if (isWhite(x, y) && !visited[y * W + x]) { queue.push([x, y]); visited[y * W + x] = 1; }
  }
}
for (let y = 0; y < H; y++) {
  for (const x of [0, W - 1]) {
    if (isWhite(x, y) && !visited[y * W + x]) { queue.push([x, y]); visited[y * W + x] = 1; }
  }
}
while (queue.length) {
  const [x, y] = queue.pop();
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    if (visited[ny * W + nx]) continue;
    if (isWhite(nx, ny)) { visited[ny * W + nx] = 1; queue.push([nx, ny]); }
  }
}

// 2. Frontière = pixels non-fond adjacents au fond → alpha progressif
const border = new Uint8Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (visited[y * W + x]) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < W && ny < H && visited[ny * W + nx]) { border[y * W + x] = 1; break; }
    }
  }
}

const out = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const r = data[i * C], g = data[i * C + 1], b = data[i * C + 2];
  let a = 255;
  if (visited[i]) a = 0;
  else if (border[i]) {
    // dé-mixage du blanc : la densité d'encre = 1 - (canal le plus clair / 255)
    const ink = 255 - Math.min(r, g, b);
    a = Math.max(0, Math.min(255, Math.round(ink * 1.15))); // léger boost anti-frange
    if (a > 0) {
      const f = a / 255;
      out[i * 4] = Math.max(0, Math.min(255, Math.round((r - (1 - f) * 255) / f)));
      out[i * 4 + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - f) * 255) / f)));
      out[i * 4 + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - f) * 255) / f)));
    }
  } else {
    out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b;
  }
  out[i * 4 + 3] = a;
}

await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(output);

const bytes = statSync(output).size;
console.log(`✓ ${output} (${W}×${H}, ${(bytes / 1024).toFixed(0)} Ko) — fond détouré`);
