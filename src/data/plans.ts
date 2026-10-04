/**
 * SAMPLE plan catalogue — copied from orqo-nv database/seeders/PlanSeeder.php.
 * Replace with the real plans (or load them from the app at build time) before launch.
 * Feature strings may contain <b> for emphasis.
 */
import type { Lang } from '../i18n';

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number; // USD per month
  yearly: number; // USD per year (0 for free)
  recommended?: string; // flag text shown on the card
  cta: { label: string; style: 'primary' | 'ghost' };
  includesLabel: string; // pricing page only
  highlights: string[]; // short list on the home page
  features: string[]; // full list on the pricing page
}

export const perMonth = (yearly: number) => `${Math.round((yearly / 12) * 10) / 10}$`;

export const plans: Record<Lang, Plan[]> = {
  ar: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'للتجربة والأعمال الصغيرة',
      monthly: 0,
      yearly: 0,
      cta: { label: 'ابدأ مجانًا', style: 'ghost' },
      includesLabel: 'كل المزايا، مع:',
      highlights: [
        '<b>2</b> أعضاء في الفريق',
        '<b>1</b> رقم واتساب · <b>1,000</b> رسالة شهريًا',
        '<b>1</b> وكيل ذكي · <b>100</b> رصيد AI شهريًا',
        '<b>1,000</b> جهة اتصال',
        '<b>5</b> حملات شهريًا · <b>3</b> أتمتة',
      ],
      features: [
        '<b>1</b> مساحة عمل · <b>2</b> أعضاء',
        '<b>1</b> رقم واتساب · <b>1,000</b> رسالة شهريًا',
        '<b>1</b> وكيل ذكي · <b>100</b> رصيد AI شهريًا',
        '<b>1,000</b> جهة اتصال',
        '<b>5</b> حملات شهريًا · <b>3</b> أتمتة',
        'دعم بالبريد الإلكتروني',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'للفرق التي تنمو',
      monthly: 29,
      yearly: 290,
      recommended: 'موصى بها للفرق',
      cta: { label: 'جرّب 14 يومًا', style: 'primary' },
      includesLabel: 'كل ما في Free، مع:',
      highlights: [
        '<b>10</b> أعضاء في الفريق',
        '<b>3</b> أرقام واتساب · <b>20,000</b> رسالة شهريًا',
        '<b>5</b> وكلاء أذكياء · <b>5,000</b> رصيد AI شهريًا',
        '<b>25,000</b> جهة اتصال',
        '<b>30</b> حملة شهريًا · <b>20</b> أتمتة',
        'نماذج AI متقدمة · دعم بأولوية',
      ],
      features: [
        '<b>3</b> مساحات عمل · <b>10</b> أعضاء',
        '<b>3</b> أرقام واتساب · <b>20,000</b> رسالة شهريًا',
        '<b>5</b> وكلاء أذكياء · <b>5,000</b> رصيد AI شهريًا',
        '<b>25,000</b> جهة اتصال',
        '<b>30</b> حملة شهريًا · <b>20</b> أتمتة',
        'نماذج AI متقدمة · دعم بأولوية',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'للمؤسسات وفرق المبيعات الكبيرة',
      monthly: 99,
      yearly: 990,
      cta: { label: 'جرّب 14 يومًا', style: 'ghost' },
      includesLabel: 'كل ما في Pro، مع:',
      highlights: [
        'أعضاء فريق <b>بلا حد</b>',
        'أرقام ورسائل واتساب <b>بلا حد</b>',
        'وكلاء ورصيد AI <b>بلا حد</b>',
        'جهات اتصال وحملات وأتمتة <b>بلا حد</b>',
        '<b>10</b> مساحات عمل · دعم مخصص و SLA',
      ],
      features: [
        '<b>10</b> مساحات عمل · أعضاء <b>بلا حد</b>',
        'أرقام ورسائل واتساب <b>بلا حد</b>',
        'وكلاء ورصيد AI <b>بلا حد</b>',
        'جهات اتصال <b>بلا حد</b>',
        'حملات وأتمتة <b>بلا حد</b>',
        'دعم مخصص و SLA',
      ],
    },
  ],
  en: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'For trying things out and small businesses',
      monthly: 0,
      yearly: 0,
      cta: { label: 'Start for free', style: 'ghost' },
      includesLabel: 'Every feature, plus:',
      highlights: [
        '<b>2</b> team members',
        '<b>1</b> WhatsApp number · <b>1,000</b> messages/month',
        '<b>1</b> AI agent · <b>100</b> AI credits/month',
        '<b>1,000</b> contacts',
        '<b>5</b> campaigns/month · <b>3</b> automations',
      ],
      features: [
        '<b>1</b> workspace · <b>2</b> members',
        '<b>1</b> WhatsApp number · <b>1,000</b> messages/month',
        '<b>1</b> AI agent · <b>100</b> AI credits/month',
        '<b>1,000</b> contacts',
        '<b>5</b> campaigns/month · <b>3</b> automations',
        'Email support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For growing teams',
      monthly: 29,
      yearly: 290,
      recommended: 'Recommended for teams',
      cta: { label: 'Try 14 days', style: 'primary' },
      includesLabel: 'Everything in Free, plus:',
      highlights: [
        '<b>10</b> team members',
        '<b>3</b> WhatsApp numbers · <b>20,000</b> messages/month',
        '<b>5</b> AI agents · <b>5,000</b> AI credits/month',
        '<b>25,000</b> contacts',
        '<b>30</b> campaigns/month · <b>20</b> automations',
        'Advanced AI models · priority support',
      ],
      features: [
        '<b>3</b> workspaces · <b>10</b> members',
        '<b>3</b> WhatsApp numbers · <b>20,000</b> messages/month',
        '<b>5</b> AI agents · <b>5,000</b> AI credits/month',
        '<b>25,000</b> contacts',
        '<b>30</b> campaigns/month · <b>20</b> automations',
        'Advanced AI models · priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'For organizations and large sales teams',
      monthly: 99,
      yearly: 990,
      cta: { label: 'Try 14 days', style: 'ghost' },
      includesLabel: 'Everything in Pro, plus:',
      highlights: [
        '<b>Unlimited</b> team members',
        '<b>Unlimited</b> WhatsApp numbers and messages',
        '<b>Unlimited</b> agents and AI credits',
        '<b>Unlimited</b> contacts, campaigns, and automations',
        '<b>10</b> workspaces · dedicated support and SLA',
      ],
      features: [
        '<b>10</b> workspaces · <b>unlimited</b> members',
        '<b>Unlimited</b> WhatsApp numbers and messages',
        '<b>Unlimited</b> agents and AI credits',
        '<b>Unlimited</b> contacts',
        '<b>Unlimited</b> campaigns and automations',
        'Dedicated support and SLA',
      ],
    },
  ],
};
