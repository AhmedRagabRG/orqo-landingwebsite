import type { Lang } from '../i18n';

export interface CompareGroup {
  title: string;
  rows: { label: string; values: [string, string] }[];
}

export const compare: Record<Lang, CompareGroup[]> = {
  ar: [
    {
      title: 'الفريق والمساحات',
      rows: [
        { label: 'مساحات العمل', values: ['3', '10'] },
        { label: 'المستخدمون', values: ['بلا حد', 'بلا حد'] },
        { label: 'موظفون في صندوق الوارد', values: ['5', 'بلا حد'] },
        { label: 'مساحة التخزين', values: ['2.5 GB', '10 GB'] },
      ],
    },
    {
      title: 'صندوق الوارد والقنوات',
      rows: [
        { label: 'حسابات واتساب', values: ['3', '10'] },
        { label: 'حسابات إنستجرام', values: ['3', '10'] },
        { label: 'حسابات ماسنجر', values: ['3', '10'] },
        { label: 'رسائل واتساب شهريًا', values: ['بلا حد', 'بلا حد'] },
        { label: 'قوالب واتساب', values: ['بلا حد', 'بلا حد'] },
      ],
    },
    {
      title: 'الذكاء الاصطناعي',
      rows: [
        { label: 'الوكلاء الأذكياء', values: ['3', '10'] },
        { label: 'رصيد AI شهريًا', values: ['2,000', '10,000'] },
      ],
    },
    {
      title: 'جهات الاتصال والحملات والأتمتة',
      rows: [
        { label: 'جهات الاتصال', values: ['بلا حد', 'بلا حد'] },
        { label: 'الحملات شهريًا', values: ['100', '200'] },
        { label: 'الأتمتة', values: ['3', '10'] },
      ],
    },
  ],
  en: [
    {
      title: 'Team & workspaces',
      rows: [
        { label: 'Workspaces', values: ['3', '10'] },
        { label: 'Users', values: ['Unlimited', 'Unlimited'] },
        { label: 'Inbox agents', values: ['5', 'Unlimited'] },
        { label: 'Storage', values: ['2.5 GB', '10 GB'] },
      ],
    },
    {
      title: 'Inbox & channels',
      rows: [
        { label: 'WhatsApp accounts', values: ['3', '10'] },
        { label: 'Instagram accounts', values: ['3', '10'] },
        { label: 'Messenger accounts', values: ['3', '10'] },
        { label: 'WhatsApp messages per month', values: ['Unlimited', 'Unlimited'] },
        { label: 'WhatsApp templates', values: ['Unlimited', 'Unlimited'] },
      ],
    },
    {
      title: 'AI',
      rows: [
        { label: 'AI agents', values: ['3', '10'] },
        { label: 'AI credits per month', values: ['2,000', '10,000'] },
      ],
    },
    {
      title: 'Contacts, campaigns & automation',
      rows: [
        { label: 'Contacts', values: ['Unlimited', 'Unlimited'] },
        { label: 'Campaigns per month', values: ['100', '200'] },
        { label: 'Automations', values: ['3', '10'] },
      ],
    },
  ],
};
