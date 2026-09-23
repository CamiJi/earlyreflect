// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './config-domain.mjs';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  /** Redirections 301 émulées (stubs HTML meta-refresh) — spec §3.
   *  Destinations préfixées de la base (Astro ne préfixe pas les destinations) ;
   *  le replace évite le double slash quand BASE_PATH = '/'. */
  redirects: {
    '/audio/': `${BASE_PATH.replace(/\/$/, '')}/work/?discipline=field-recording`,
    '/musique/': `${BASE_PATH.replace(/\/$/, '')}/music/`,
    '/cv/': `${BASE_PATH.replace(/\/$/, '')}/about/`,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
