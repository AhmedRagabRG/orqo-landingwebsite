import { site } from '../config/site';
import { switchPath } from '../i18n';

export const cleanPath = (path: string) => path.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
export const absolute = (path: string) => new URL(cleanPath(path), site.url).href;
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
export const alternates = (path: string) => (['en', 'ar'] as const).map((lang) => ({ lang, url: absolute(switchPath(path, lang)) }));
export const organization = {
  '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name,
  url: `${site.url}/`, logo: `${site.url}/favicon.svg`, email: site.email,
  sameAs: Object.values(site.social),
};
export const website = {
  '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name,
  url: `${site.url}/`, inLanguage: ['en', 'ar'], publisher: { '@id': organization['@id'] },
};
export const breadcrumbData = (items: { label: string; path: string }[]) => ({
  '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({
    '@type': 'ListItem', position: i + 1, name: item.label, item: absolute(item.path),
  })),
});
