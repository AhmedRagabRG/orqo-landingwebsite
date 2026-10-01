export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'المنصة', href: '/#problem' },
  { label: 'الحملات', href: '/#campaigns' },
  { label: 'جهات الاتصال', href: '/#contacts' },
  { label: 'الأتمتة', href: '/#automation' },
  { label: 'التكاملات', href: '/#integrations' },
  { label: 'الأسعار', href: '/pricing' },
  { label: 'تواصل معنا', href: '/contact' },
];
