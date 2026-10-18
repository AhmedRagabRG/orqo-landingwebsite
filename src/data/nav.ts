import type { Lang } from '../i18n';

export interface NavItem {
  label: string;
  href: string;
}

export const nav: Record<Lang, NavItem[]> = {
  ar: [
    { label: 'الرئيسية', href: '/' },
    { label: 'الأسعار', href: '/pricing' },
    { label: 'تواصل معنا', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact us', href: '/contact' },
  ],
};
