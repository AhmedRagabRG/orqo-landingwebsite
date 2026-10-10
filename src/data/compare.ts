import type { Lang } from '../i18n';

export interface CompareGroup {
  title: string;
  rows: { label: string; values: [string, string, string] }[];
}

export const compare: Record<Lang, CompareGroup[]> = {
  ar: [
    {
      title: 'الفريق والمساحات',
      rows: [
        { label: 'مساحات العمل', values: ['1', '3', '10'] },
        { label: 'المستخدمون', values: ['1', 'بلا حد', 'بلا حد'] },
        { label: 'موظفون في صندوق الوارد', values: ['1', '5', 'بلا حد'] },
        { label: 'مساحة التخزين', values: ['50 MB', '2.5 GB', '10 GB'] },
      ],
    },
    {
      title: 'صندوق الوارد والقنوات',
      rows: [
        { label: 'حسابات واتساب', values: ['1', '3', '10'] },
        { label: 'حسابات إنستجرام', values: ['—', '3', '10'] },
        { label: 'حسابات ماسنجر', values: ['—', '3', '10'] },
        { label: 'رسائل واتساب شهريًا', values: ['100', 'بلا حد', 'بلا حد'] },
        { label: 'قوالب واتساب', values: ['1', 'بلا حد', 'بلا حد'] },
      ],
    },
    {
      title: 'الذكاء الاصطناعي',
      rows: [
        { label: 'الوكلاء الأذكياء', values: ['1', '3', '10'] },
        { label: 'رصيد AI شهريًا', values: ['50', '2,000', '10,000'] },
      ],
    },
    {
      title: 'جهات الاتصال والحملات والأتمتة',
      rows: [
        { label: 'جهات الاتصال', values: ['50', 'بلا حد', 'بلا حد'] },
        { label: 'الحملات شهريًا', values: ['2', '100', '200'] },
        { label: 'الأتمتة', values: ['1', '3', '10'] },
      ],
    },
  ],
  en: [
    {
      title: 'Team & workspaces',
      rows: [
        { label: 'Workspaces', values: ['1', '3', '10'] },
        { label: 'Users', values: ['1', 'Unlimited', 'Unlimited'] },
        { label: 'Inbox agents', values: ['1', '5', 'Unlimited'] },
        { label: 'Storage', values: ['50 MB', '2.5 GB', '10 GB'] },
      ],
    },
    {
      title: 'Inbox & channels',
      rows: [
        { label: 'WhatsApp accounts', values: ['1', '3', '10'] },
        { label: 'Instagram accounts', values: ['—', '3', '10'] },
        { label: 'Messenger accounts', values: ['—', '3', '10'] },
        { label: 'WhatsApp messages per month', values: ['100', 'Unlimited', 'Unlimited'] },
        { label: 'WhatsApp templates', values: ['1', 'Unlimited', 'Unlimited'] },
      ],
    },
    {
      title: 'AI',
      rows: [
        { label: 'AI agents', values: ['1', '3', '10'] },
        { label: 'AI credits per month', values: ['50', '2,000', '10,000'] },
      ],
    },
    {
      title: 'Contacts, campaigns & automation',
      rows: [
        { label: 'Contacts', values: ['50', 'Unlimited', 'Unlimited'] },
        { label: 'Campaigns per month', values: ['2', '100', '200'] },
        { label: 'Automations', values: ['1', '3', '10'] },
      ],
    },
  ],
};
