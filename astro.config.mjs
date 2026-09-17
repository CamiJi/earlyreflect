// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://camijii.github.io',
  base: '/earlyreflect',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  /** Redirections 301 émulées (stubs HTML meta-refresh) — spec §3.
   *  Destinations préfixées de la base (Astro ne préfixe pas les destinations). */
  redirects: {
    '/audio/': '/earlyreflect/work/?discipline=field-recording',
    '/musique/': '/earlyreflect/music/',
    '/cv/': '/earlyreflect/about/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
