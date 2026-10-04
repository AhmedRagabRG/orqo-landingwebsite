/**
 * i18n glue. UI strings live in ar.ts / en.ts (en must satisfy typeof ar, so a
 * missing key fails the build). Content-like data — nav, plans, faq, compare —
 * keeps both locales side by side in its own file under src/data.
 */
import type { AstroGlobal } from 'astro';
import { ar } from './ar';
import { en } from './en';

export type Lang = 'ar' | 'en';
export type Dict = typeof ar;

const dicts: Record<Lang, Dict> = { ar, en };

export const getLang = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'ar');
export const getT = (locale: string | undefined): Dict => dicts[getLang(locale)];

/** Prefix an internal href with the locale segment (English only). */
export const href = (lang: Lang, path: string) => (lang === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path);

/** Per-component helper: const { lang, t, href } = I(Astro); */
export const I = (astro: AstroGlobal) => {
  const lang = getLang(astro.currentLocale);
  return { lang, t: dicts[lang], href: (path: string) => href(lang, path) };
};

/** Given the current pathname, the same page in the other locale. */
export const switchPath = (pathname: string, to: Lang) => {
  const clean = pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const stripped = (clean === '/' ? '/' : clean.replace(/^\/en(?=\/|$)/, '')) || '/';
  return href(to, stripped);
};
