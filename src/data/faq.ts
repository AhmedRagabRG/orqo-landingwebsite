/** FAQ content for the shared Faq component. Several groups render as tabs. Confirm answers before launch. */
import type { Lang } from '../i18n';

export interface FaqGroup {
  id: string;
  label: string;
  /** review: note shown only in review mode (PUBLIC_SHOW_REVIEW). */
  items: { q: string; a: string; review?: string }[];
}

export const homeFaq: Record<Lang, FaqGroup[]> = {
  ar: [
    {
      id: 'general',
      label: 'عام',
      items: [
        { q: 'هل ORQO مجرد صندوق وارد لواتساب؟', a: 'صندوق الوارد هو البداية. ORQO يجمع معه وكلاء ذكاء اصطناعي، وملف العميل، والمراحل، والأتمتة، وحملات واتساب، والتقارير في مساحة عمل واحدة لفريقك.' },
        { q: 'ما القنوات المدعومة؟', a: 'واتساب وإنستجرام وماسنجر، في صندوق وارد واحد. وORQO مسجّل كـ Meta Tech Provider، فيتم الربط من خلال القنوات الرسمية لـ Meta.' },
        { q: 'هل يعمل ORQO بالعربية والإنجليزية؟', a: 'نعم. الواجهة مصممة للعربية من اليمين لليسار، وتدعم الإنجليزية أيضًا.' },
        { q: 'هل يناسب نوع عملي؟', a: 'إذا كان عملك يستقبل رسائل عملاء، فـORQO مناسب له: عيادات، تعليم، عقارات، سفر، متاجر إلكترونية، وشركات خدمات.' },
      ],
    },
    {
      id: 'pricing',
      label: 'الأسعار',
      items: [
        { q: 'هل يمكن استخدام ORQO مجانًا؟', a: 'نعم. خطة Starter مجانية دائمًا ولا تحتاج بطاقة دفع، وتستطيع الترقية في أي وقت.' },
        { q: 'ماذا يحدث عندما أصل إلى حد الاستخدام؟', a: 'يظهر لك تنبيه في لوحة التحكم، ولا يمكنك إنشاء المزيد من العنصر الذي وصل لحده حتى يبدأ الشهر الجديد أو ترقّي خطتك.' },
        { q: 'هل تشمل الأسعار رسوم Meta على رسائل واتساب؟', a: 'رسوم Meta على محادثات واتساب منفصلة عن اشتراك ORQO، وتُحتسب حسب تسعير Meta لكل دولة ونوع رسالة.' },
        { q: 'هل أستطيع الإلغاء في أي وقت؟', a: 'نعم. عند الإلغاء أو انتهاء الاشتراك يعود حسابك تلقائيًا إلى خطة Starter، وتبقى بياناتك كما هي.' },
      ],
    },
    {
      id: 'ai',
      label: 'الذكاء الاصطناعي',
      items: [
        { q: 'هل يرد الوكيل الذكي على كل شيء وحده؟', a: 'أنت تحدد هدفه وتعليماته ومصادر معرفته وقواعد تحويله. وعندما يحتاج الأمر إلى إنسان يسلّم المحادثة لفريقك مع ملخص.' },
        { q: 'من أين يأخذ الوكيل معلوماته؟', a: 'من مصادر المعرفة التي تضيفها: نصوص، وأسئلة شائعة، وملفات PDF و DOCX و TXT و CSV، وروابط وصفحات موقعك.' },
        { q: 'هل أستطيع استلام المحادثة من الوكيل؟', a: 'نعم. أي موظف يستطيع استلام المحادثة والرد بنفسه في أي وقت، وكل ما فعله الوكيل مسجّل في المحادثة.' },
      ],
    },
    {
      id: 'campaigns',
      label: 'الحملات والتكاملات',
      items: [
        { q: 'هل أستطيع إرسال رسائل واتساب جماعية؟', a: 'نعم، من خلال حملات واتساب بقوالب معتمدة من Meta، لشرائح من عملائك الذين وافقوا على التواصل معهم. ويُستبعد تلقائيًا من ألغى الاشتراك.' },
        { q: 'هل يدعم المتاجر الإلكترونية؟', a: 'نعم. تكامل مع Shopify و WooCommerce و EasyOrders: الطلبات والعملاء والسلات المتروكة، وتأكيد طلبات الدفع عند الاستلام على واتساب.' },
        { q: 'هل يمكن ربط ORQO بأنظمتنا؟', a: 'نعم. تكاملات مع Google Sheets و Google Meet، وعقدة موثّقة في n8n، وAPI و Webhooks لأي نظام آخر.' },
      ],
    },
  ],
  en: [
    {
      id: 'general',
      label: 'General',
      items: [
        { q: 'Is ORQO just a WhatsApp inbox?', a: 'The inbox is the starting point. ORQO brings AI agents, the customer profile, stages, automation, WhatsApp campaigns, and reports together in one workspace for your team.' },
        { q: 'Which channels are supported?', a: 'WhatsApp, Instagram, and Messenger in one shared inbox. ORQO is registered as a Meta Tech Provider, so connections happen through Meta’s official channels.' },
        { q: 'Does ORQO work in Arabic and English?', a: 'Yes. The interface is designed right-to-left for Arabic, and English is fully supported as well.' },
        { q: 'Is it a fit for my kind of business?', a: 'If your business receives customer messages, ORQO fits it: clinics, education, real estate, travel, e-commerce stores, and service companies.' },
      ],
    },
    {
      id: 'pricing',
      label: 'Pricing',
      items: [
        { q: 'Can I use ORQO for free?', a: 'Yes. Starter is free forever and needs no credit card. You can upgrade at any time.' },
        { q: 'What happens when I reach a usage limit?', a: 'An alert appears in your dashboard, and you can’t create more of the item that hit its limit until the new month starts or you upgrade your plan.' },
        { q: 'Do the prices include Meta’s WhatsApp fees?', a: 'Meta’s fees for WhatsApp conversations are separate from the ORQO subscription, and are charged according to Meta’s pricing per country and message type.' },
        { q: 'Can I cancel at any time?', a: 'Yes. On cancellation or subscription end, your account automatically returns to Starter, and your data stays as it is.' },
      ],
    },
    {
      id: 'ai',
      label: 'AI',
      items: [
        { q: 'Does the AI agent reply to everything on its own?', a: 'You define its goal, instructions, knowledge sources, and handover rules. And when a human is needed, it hands the conversation to your team with a summary.' },
        { q: 'Where does the agent get its information?', a: 'From the knowledge sources you add: texts, FAQs, PDF, DOCX, TXT and CSV files, and links to your website pages.' },
        { q: 'Can I take the conversation over from the agent?', a: 'Yes. Any teammate can take over the conversation and reply themselves at any time, and everything the agent did stays logged in the conversation.' },
      ],
    },
    {
      id: 'campaigns',
      label: 'Campaigns & integrations',
      items: [
        { q: 'Can I send bulk WhatsApp messages?', a: 'Yes, through WhatsApp campaigns with Meta-approved templates, to segments of customers who agreed to hear from you. Anyone who unsubscribed is excluded automatically.' },
        { q: 'Does it support e-commerce stores?', a: 'Yes. Integrations with Shopify, WooCommerce and EasyOrders: orders, customers, and abandoned carts, plus cash-on-delivery order confirmation on WhatsApp.' },
        { q: 'Can ORQO connect to our systems?', a: 'Yes. Integrations with Google Sheets and Google Meet, a verified node in n8n, and APIs and Webhooks for any other system.' },
      ],
    },
  ],
};

export const pricingFaq: Record<Lang, FaqGroup[]> = {
  ar: [
    {
      id: 'starter',
      label: 'خطة Starter',
      items: [
        { q: 'هل خطة Starter مجانية فعلًا؟', a: 'نعم. خطة Starter مجانية دائمًا ولا تحتاج بطاقة دفع.' },
        { q: 'هل أحتاج بطاقة دفع للتسجيل؟', a: 'لا. تسجّل وتبدأ بخطة Starter مباشرة، وتضيف وسيلة دفع فقط عندما ترقّي خطتك.' },
      ],
    },
    {
      id: 'limits',
      label: 'الحدود والاستهلاك',
      items: [
        { q: 'ماذا يحدث عندما أصل إلى حد الاستخدام؟', a: 'يظهر لك تنبيه في لوحة التحكم، ولا يمكنك إنشاء المزيد من العنصر الذي وصل لحده حتى يبدأ الشهر الجديد أو ترقّي خطتك.' },
        { q: 'هل الحدود لكل مساحة عمل؟', a: 'الحدود على مستوى المؤسسة. استهلاك كل مساحات العمل التابعة لها يُجمع معًا.' },
        { q: 'هل تشمل الأسعار رسوم Meta على رسائل واتساب؟', a: 'رسوم Meta على محادثات واتساب منفصلة عن اشتراك ORQO، وتُحتسب حسب تسعير Meta لكل دولة ونوع رسالة.', review: 'أكّد طريقة احتساب رسوم Meta ومن يدفعها (P3)' },
      ],
    },
    {
      id: 'billing',
      label: 'الدفع والإلغاء',
      items: [
        { q: 'بأي عملة أدفع؟', a: 'الأسعار بالدولار الأمريكي، ويظهر لزوار مصر سعر تقريبي بالجنيه المصري. يتم الدفع بالبطاقة عبر بوابة دفع آمنة.' },
        { q: 'هل أستطيع الإلغاء في أي وقت؟', a: 'نعم. عند الإلغاء أو انتهاء الاشتراك يعود حسابك تلقائيًا إلى خطة Starter، وتبقى بياناتك كما هي.' },
      ],
    },
  ],
  en: [
    {
      id: 'starter',
      label: 'Starter',
      items: [
        { q: 'Is Starter actually free?', a: 'Yes. Starter is free forever and needs no credit card.' },
        { q: 'Do I need a credit card to sign up?', a: 'No. You sign up and start on Starter right away, and add a payment method only when you upgrade.' },
      ],
    },
    {
      id: 'limits',
      label: 'Limits & usage',
      items: [
        { q: 'What happens when I reach a usage limit?', a: 'An alert appears in your dashboard, and you can’t create more of the item that hit its limit until the new month starts or you upgrade your plan.' },
        { q: 'Are the limits per workspace?', a: 'Limits are per organization. Usage across all of its workspaces is summed together.' },
        { q: 'Do the prices include Meta’s WhatsApp fees?', a: 'Meta’s fees for WhatsApp conversations are separate from the ORQO subscription, and are charged according to Meta’s pricing per country and message type.', review: 'Confirm how Meta fees are calculated and who pays them (P3)' },
      ],
    },
    {
      id: 'billing',
      label: 'Billing & cancellation',
      items: [
        { q: 'What currency do I pay in?', a: 'Prices are in US dollars, and visitors from Egypt see an approximate price in Egyptian pounds. Payment is by card through a secure payment gateway.' },
        { q: 'Can I cancel at any time?', a: 'Yes. On cancellation or subscription end, your account automatically returns to Starter, and your data stays as it is.' },
      ],
    },
  ],
};
