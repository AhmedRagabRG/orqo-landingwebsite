import type { Lang } from '../i18n';

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number; // USD per month
  recommended?: string;
  cta: { label: string; style: 'primary' | 'ghost' };
  includesLabel: string;
  highlights: string[];
  features: string[];
}

export const plans: Record<Lang, Plan[]> = {
  ar: [
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'للفرق التي تنمو',
      monthly: 49,
      recommended: 'الأكثر شيوعًا',
      cta: { label: 'ابدأ التجربة المجانية', style: 'primary' },
      includesLabel: 'تشمل الخطة:',
      highlights: [
        '<b>3</b> مساحات عمل · مستخدمون <b>بلا حد</b>',
        '<b>3</b> حسابات لكل من واتساب وإنستجرام وماسنجر',
        'جهات اتصال ورسائل واتساب وقوالب <b>بلا حد</b>',
        '<b>3</b> وكلاء أذكياء · <b>2,000</b> رصيد AI شهريًا',
        '<b>100</b> حملة شهريًا · <b>3</b> أتمتة',
      ],
      features: [
        '<b>3</b> مساحات عمل',
        'مستخدمون <b>بلا حد</b>',
        'جهات اتصال <b>بلا حد</b>',
        '<b>3</b> حسابات واتساب',
        '<b>3</b> حسابات إنستجرام',
        '<b>3</b> حسابات ماسنجر',
        'رسائل واتساب <b>بلا حد</b>',
        'قوالب واتساب <b>بلا حد</b>',
        '<b>100</b> حملة شهريًا',
        '<b>5</b> موظفين في صندوق الوارد',
        '<b>3</b> وكلاء أذكياء',
        '<b>2,000</b> رصيد AI شهريًا',
        '<b>3</b> أتمتة',
        '<b>2.5 GB</b> مساحة تخزين',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'للشركات وفرق المبيعات الكبيرة',
      monthly: 99,
      cta: { label: 'ابدأ التجربة المجانية', style: 'ghost' },
      includesLabel: 'تشمل الخطة:',
      highlights: [
        '<b>10</b> مساحات عمل · مستخدمون <b>بلا حد</b>',
        '<b>10</b> حسابات لكل من واتساب وإنستجرام وماسنجر',
        'جهات اتصال ورسائل واتساب وقوالب <b>بلا حد</b>',
        '<b>10</b> وكلاء أذكياء · <b>10,000</b> رصيد AI شهريًا',
        '<b>200</b> حملة شهريًا · <b>10</b> أتمتة',
      ],
      features: [
        '<b>10</b> مساحات عمل',
        'مستخدمون <b>بلا حد</b>',
        'جهات اتصال <b>بلا حد</b>',
        '<b>10</b> حسابات واتساب',
        '<b>10</b> حسابات إنستجرام',
        '<b>10</b> حسابات ماسنجر',
        'رسائل واتساب <b>بلا حد</b>',
        'قوالب واتساب <b>بلا حد</b>',
        '<b>200</b> حملة شهريًا',
        'موظفون في صندوق الوارد <b>بلا حد</b>',
        '<b>10</b> وكلاء أذكياء',
        '<b>10,000</b> رصيد AI شهريًا',
        '<b>10</b> أتمتة',
        '<b>10 GB</b> مساحة تخزين',
      ],
    },
  ],
  en: [
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For growing teams',
      monthly: 49,
      recommended: 'Most popular',
      cta: { label: 'Start free trial', style: 'primary' },
      includesLabel: 'Plan includes:',
      highlights: [
        '<b>3</b> workspaces · <b>unlimited</b> users',
        '<b>3</b> WhatsApp, Instagram, and Messenger accounts each',
        '<b>Unlimited</b> contacts, WhatsApp messages, and templates',
        '<b>3</b> AI agents · <b>2,000</b> AI credits/month',
        '<b>100</b> campaigns/month · <b>3</b> automations',
      ],
      features: [
        '<b>3</b> workspaces',
        '<b>Unlimited</b> users',
        '<b>Unlimited</b> contacts',
        '<b>3</b> WhatsApp accounts',
        '<b>3</b> Instagram accounts',
        '<b>3</b> Messenger accounts',
        '<b>Unlimited</b> WhatsApp messages',
        '<b>Unlimited</b> WhatsApp templates',
        '<b>100</b> campaigns/month',
        '<b>5</b> inbox agents',
        '<b>3</b> AI agents',
        '<b>2,000</b> AI credits/month',
        '<b>3</b> automations',
        '<b>2.5 GB</b> storage',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'For businesses and large sales teams',
      monthly: 99,
      cta: { label: 'Start free trial', style: 'ghost' },
      includesLabel: 'Plan includes:',
      highlights: [
        '<b>10</b> workspaces · <b>unlimited</b> users',
        '<b>10</b> WhatsApp, Instagram, and Messenger accounts each',
        '<b>Unlimited</b> contacts, WhatsApp messages, and templates',
        '<b>10</b> AI agents · <b>10,000</b> AI credits/month',
        '<b>200</b> campaigns/month · <b>10</b> automations',
      ],
      features: [
        '<b>10</b> workspaces',
        '<b>Unlimited</b> users',
        '<b>Unlimited</b> contacts',
        '<b>10</b> WhatsApp accounts',
        '<b>10</b> Instagram accounts',
        '<b>10</b> Messenger accounts',
        '<b>Unlimited</b> WhatsApp messages',
        '<b>Unlimited</b> WhatsApp templates',
        '<b>200</b> campaigns/month',
        '<b>Unlimited</b> inbox agents',
        '<b>10</b> AI agents',
        '<b>10,000</b> AI credits/month',
        '<b>10</b> automations',
        '<b>10 GB</b> storage',
      ],
    },
  ],
};
