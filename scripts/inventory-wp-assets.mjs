#!/usr/bin/env node
/**
 * Inventorie les assets hotlinkés de l'ancien site WordPress (avec accord de Mathieu).
 * Récupère les dimensions via sharp → src/data/wp-assets.json (committé, zéro fetch au build).
 * Usage : node scripts/inventory-wp-assets.mjs
 */
import sharp from 'sharp';

const BASE = 'https://earlyreflect.com/wp-content/uploads';

/** [clé, url, alt EN, alt FR] — uniquement les assets vérifiés HTTP 200 */
const ASSETS = {
  logoQuanticDream: [`${BASE}/2016/03/quantic-dream1.png`, 'Quantic Dream logo', 'Logo Quantic Dream'],
  logoUbisoft: [`${BASE}/2016/03/ubisoft-stacked-logo_black.png`, 'Ubisoft logo', 'Logo Ubisoft'],
  logoIsart: [`${BASE}/2016/03/logo_isart_seul_noir_300dpi_3100pixel_2013-12.png`, 'ISART Digital logo', 'Logo ISART Digital'],
  logoIna: [`${BASE}/2019/10/1200px-logo_ina.svg_.png`, 'INA logo', 'Logo INA'],
  logoGaumont: [`${BASE}/2016/03/gaumont_animation_logo-svg.png`, 'Gaumont Animation logo', 'Logo Gaumont Animation'],
  photoStudio: [`${BASE}/2013/11/mat-stud-crop.jpg`, 'Mathieu Fiorentini in his studio', 'Mathieu Fiorentini dans son studio'],
  photoPloupi: [`${BASE}/2013/11/ploupi.jpg`, 'Mathieu Fiorentini portrait', 'Portrait de Mathieu Fiorentini'],
  yakieUniverse: [`${BASE}/2013/11/yakie_univers-graphique_201413.jpg`, 'Yakie graphic identity', 'Univers graphique Yakie'],
  yakieLogo: [`${BASE}/2013/11/yakie_logo_white_trash.jpg`, 'Yakie logo', 'Logo Yakie'],
};

const out = {};
for (const [key, [url, altEn, altFr]] of Object.entries(ASSETS)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const meta = await sharp(buf).metadata();
    out[key] = { url, alt: { en: altEn, fr: altFr }, width: meta.width, height: meta.height, format: meta.format };
    console.log(`✓ ${key}: ${meta.width}×${meta.height} ${meta.format}`);
  } catch (err) {
    console.error(`✗ ${key}: ${err.message}`);
  }
}

const { writeFile } = await import('node:fs/promises');
await writeFile('src/data/wp-assets.json', JSON.stringify(out, null, 2) + '\n');
console.log('→ src/data/wp-assets.json');
