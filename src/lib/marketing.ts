import { getCollection, type CollectionEntry } from 'astro:content';
import { href, type Lang } from '../i18n';
export type MarketingEntry = CollectionEntry<'marketing'>;
export const kinds = ['features', 'solutions', 'compare', 'alternatives', 'blog'] as const;
export type Kind = typeof kinds[number];
export const labels: Record<Lang, Record<Kind, string>> = {
  en: { features: 'Features', solutions: 'Solutions', compare: 'Compare ORQO', alternatives: 'Alternatives', blog: 'Guides' },
  ar: { features: 'المزايا', solutions: 'الحلول', compare: 'مقارنة ORQO', alternatives: 'البدائل', blog: 'الأدلة' },
};
export const introductions: Record<Lang, Record<Kind, string>> = {
  en: {
    features: 'Explore the tools behind your customer conversations: a shared inbox, customer profiles, AI replies, campaigns, and team workflows.',
    solutions: 'Practical ways to organize customer communication for online stores and clinics, with examples your team can adapt.',
    compare: 'Compare capabilities, pricing models, and day-to-day workflows using official product sources. Choose around your actual requirements.',
    alternatives: 'Build a shortlist around your channels, team, and workflows. These buying guides explain what to test before changing platforms.',
    blog: 'Practical guides to WhatsApp support, shared inboxes, and customer communication. Start with a focused workflow and improve it with your team.',
  },
  ar: {
    features: 'تعرّف على أدوات محادثات العملاء: صندوق وارد مشترك، وملفات للعملاء، وردود بالذكاء الاصطناعي، وحملات، وتنظيم عمل الفريق.',
    solutions: 'طرق عملية لتنظيم تواصل المتاجر الإلكترونية والعيادات مع العملاء، مع أمثلة يمكن لفريقك تكييفها مع عمله.',
    compare: 'قارن المزايا ونماذج التسعير وأساليب العمل اعتمادًا على المصادر الرسمية، واختر وفق احتياجات فريقك الفعلية.',
    alternatives: 'كوّن قائمة مختصرة وفق قنواتك وفريقك وطريقة عملك. توضّح هذه الأدلة ما ينبغي اختباره قبل الانتقال إلى منصة أخرى.',
    blog: 'أدلة عملية لدعم العملاء على واتساب وصناديق الوارد المشتركة وتنظيم التواصل. ابدأ بمسار عمل محدد وطوّره مع فريقك.',
  },
};
export const entryPath = (entry: MarketingEntry) => href(entry.data.lang, `/${entry.data.kind}/${entry.data.slug}`);
export async function entriesFor(lang: Lang) {
  const published = await getCollection('marketing', ({ data }) => !data.draft);
  const keys = new Set(published.map(e => `${e.data.lang}/${e.data.kind}/${e.data.slug}`));
  for (const entry of published) {
    const { kind, slug, lang: locale } = entry.data;
    if (!keys.has(`${locale === 'en' ? 'ar' : 'en'}/${kind}/${slug}`)) throw new Error(`Missing published translation for ${entry.id}`);
    for (const related of entry.data.related) {
      if (!keys.has(`${locale}${related}`)) throw new Error(`Missing related content ${locale}${related} in ${entry.id}`);
    }
  }
  const entries = published.filter(e => e.data.lang === lang);
  return entries.sort((a, b) => (b.data.published || '').localeCompare(a.data.published || '') || a.data.slug.localeCompare(b.data.slug));
}
