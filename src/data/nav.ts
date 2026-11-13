import type { Lang } from '../i18n';

export interface NavItem {
  label: string;
  href: string;
}

export const nav: Record<Lang, NavItem[]> = {
  ar: [
    { label: 'الرئيسية', href: '/' },
    { label: 'المزايا', href: '/features' },
    { label: 'الأدلة', href: '/blog' },
    { label: 'الأسعار', href: '/pricing' },
    { label: 'تواصل معنا', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Guides', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact us', href: '/contact' },
  ],
};
