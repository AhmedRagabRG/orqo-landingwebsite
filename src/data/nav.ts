import type { Lang } from '../i18n';

export interface NavItem {
  label: string;
  href: string;
}

export const nav: Record<Lang, NavItem[]> = {
  ar: [
    { label: 'المنصة', href: '/#problem' },
    { label: 'الحملات', href: '/#campaigns' },
    { label: 'جهات الاتصال', href: '/#contacts' },
    { label: 'الأتمتة', href: '/#automation' },
    { label: 'التكاملات', href: '/pricing#integrations' },
    { label: 'الأسعار', href: '/pricing' },
    { label: 'تواصل معنا', href: '/contact' },
  ],
  en: [
    { label: 'Platform', href: '/#problem' },
    { label: 'Campaigns', href: '/#campaigns' },
    { label: 'Contacts', href: '/#contacts' },
    { label: 'Automation', href: '/#automation' },
    { label: 'Integrations', href: '/pricing#integrations' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact us', href: '/contact' },
  ],
};
