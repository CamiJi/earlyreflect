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
  redirects: {
    '/audio/': `${BASE_PATH}/work/?discipline=field-recording`,
    '/musique/': `${BASE_PATH}/music/`,
    '/cv/': `${BASE_PATH}/about/`,
    '/cv-2/': `${BASE_PATH}/about/`,
    '/musique-2/': `${BASE_PATH}/music/`,
    '/a-propos/': `${BASE_PATH}/fr/a-propos/`,
    '/enseignement/': `${BASE_PATH}/consulting/`,
    '/bande-demo-2/': `${BASE_PATH}/work/?discipline=show-reel`,
    '/son/': `${BASE_PATH}/work/`,
    '/demo/': `${BASE_PATH}/work/?discipline=show-reel`,
    '/about-temp/': `${BASE_PATH}/about/`,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
