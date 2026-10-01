/**
 * SAMPLE plan catalogue — copied from orqo-nv database/seeders/PlanSeeder.php.
 * Replace with the real plans (or load them from the app at build time) before launch.
 * Feature strings may contain <b> for emphasis.
 */
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

export const plans: Plan[] = [
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
];

/** "$24" style monthly equivalent of a yearly price. */
export const perMonth = (yearly: number) => `${Math.round((yearly / 12) * 10) / 10}$`;
