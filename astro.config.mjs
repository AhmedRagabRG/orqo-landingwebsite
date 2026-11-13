// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** @param {string} url */
const clean = (url) => url.replace(/\/+$/, '') || '/';
/** @param {string} url */
const readPage = (url) => {
  const path = new URL(url).pathname.replace(/^\//, '');
  try { return readFileSync(join(process.cwd(), 'dist', path, 'index.html'), 'utf8'); } catch { return ''; }
};
export default defineConfig({
  site: 'https://www.orqo.site',
  trailingSlash: 'never',
  build: { format: 'directory' },
  redirects: { '/en': '/', '/en/pricing': '/pricing', '/en/contact': '/contact', '/en/privacy': '/privacy', '/en/terms': '/terms' },
  i18n: { defaultLocale: 'en', locales: ['ar', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [
    // https://docs.astro.build/en/guides/integrations-guide/sitemap/#serialize
    sitemap({
      filter: (page) => !/^\/(?:en(?:\/|$)|404|api(?:\/|$))/.test(new URL(page).pathname) && !/name="robots" content="noindex/.test(readPage(page)),
      i18n: { defaultLocale: 'en', locales: { ar: 'ar', en: 'en' } },
      serialize(item) {
        item.url = new URL(item.url).pathname === '/' ? 'https://www.orqo.site/' : clean(item.url);
        if (item.links) item.links = item.links.map(link => ({ ...link, url: new URL(link.url).pathname === '/' ? 'https://www.orqo.site/' : clean(link.url) }));
        const modified = readPage(item.url).match(/property="article:modified_time" content="([^"]+)"/);
        if (modified) item.lastmod = modified[1];
        return item;
      },
    }),
  ],
});
