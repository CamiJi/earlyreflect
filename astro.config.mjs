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
  /** Redirections 301 émulées (stubs HTML meta-refresh) — spec §3 + vieilles URLs
   *  du sitemap WordPress (cv-2, musique-2, a-propos, son, demo… trouvées référencées).
   *  Destinations préfixées de la base (Astro ne préfixe pas les destinations) ;
   *  le replace évite le double slash quand BASE_PATH = '/'. */
  redirects: Object.fromEntries(
    Object.entries({
      '/audio/': '/work/?discipline=field-recording',
      '/musique/': '/music/',
      '/cv/': '/about/',
      '/cv-2/': '/about/',
      '/musique-2/': '/music/',
      '/a-propos/': '/fr/a-propos/',
      '/enseignement/': '/consulting/',
      '/bande-demo-2/': '/work/?discipline=show-reel',
      '/son/': '/work/',
      '/demo/': '/work/?discipline=show-reel',
      '/about-temp/': '/about/',
    }).map(([from, to]) => [from, `${BASE_PATH.replace(/\/$/, '')}${to}`]),
  ),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
