// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.orqo.site',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // English became the default locale; keep old /en links alive.
  redirects: { '/en': '/', '/en/pricing': '/pricing', '/en/contact': '/contact', '/en/privacy': '/privacy', '/en/terms': '/terms' },
  i18n: {
    defaultLocale: 'en',
    locales: ['ar', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { ar: 'ar', en: 'en' } },
    }),
  ],
});
