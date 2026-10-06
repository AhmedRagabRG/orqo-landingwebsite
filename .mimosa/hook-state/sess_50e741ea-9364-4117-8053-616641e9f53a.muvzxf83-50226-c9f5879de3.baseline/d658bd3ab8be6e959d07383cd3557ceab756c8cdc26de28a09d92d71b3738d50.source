/**
 * SAMPLE comparison table — values from PlanSeeder.php. Columns follow the order of `plans`.
 * Use '✓' for included, '—' for not included, and the locale's unlimited label for unlimited.
 */
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
        { label: 'أعضاء الفريق', values: ['2', '10', 'بلا حد'] },
        { label: 'موظفون في صندوق الوارد', values: ['2', '10', 'بلا حد'] },
        { label: 'مساحة التخزين', values: ['5 GB', '50 GB', '500 GB'] },
        { label: 'أدوار وصلاحيات', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'صندوق الوارد والقنوات',
      rows: [
        { label: 'واتساب وإنستجرام وماسنجر في صندوق واحد', values: ['✓', '✓', '✓'] },
        { label: 'أرقام واتساب', values: ['1', '3', 'بلا حد'] },
        { label: 'رسائل واتساب شهريًا', values: ['1,000', '20,000', 'بلا حد'] },
        { label: 'قوالب واتساب', values: ['10', '50', 'بلا حد'] },
        { label: 'توزيع تلقائي للمحادثات', values: ['✓', '✓', '✓'] },
        { label: 'ملاحظات داخلية وردود جاهزة', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'الوكلاء الأذكياء',
      rows: [
        { label: 'وكلاء أذكياء', values: ['1', '5', 'بلا حد'] },
        { label: 'رصيد AI شهريًا', values: ['100', '5,000', 'بلا حد'] },
        { label: 'مصادر المعرفة', values: ['3', '25', 'بلا حد'] },
        { label: 'مساحة المعرفة', values: ['25 MB', '500 MB', 'بلا حد'] },
        { label: 'نماذج AI متقدمة', values: ['—', '✓', '✓'] },
        { label: 'تشغيلات متزامنة', values: ['1', '5', 'بلا حد'] },
        { label: 'التسليم لموظف وملخص المحادثة', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'جهات الاتصال و CRM',
      rows: [
        { label: 'جهات الاتصال', values: ['1,000', '25,000', 'بلا حد'] },
        { label: 'حقول مخصصة ووسم وملاحظات', values: ['✓', '✓', '✓'] },
        { label: 'مراحل العملاء', values: ['✓', '✓', '✓'] },
        { label: 'الشرائح والاستيراد من CSV و Excel', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'الحملات والأتمتة',
      rows: [
        { label: 'حملات واتساب شهريًا', values: ['5', '30', 'بلا حد'] },
        { label: 'تقارير الحملات', values: ['✓', '✓', '✓'] },
        { label: 'الأتمتة', values: ['3', '20', 'بلا حد'] },
      ],
    },
    {
      title: 'التجارة الإلكترونية',
      rows: [
        { label: 'ربط Shopify و WooCommerce و EasyOrders', values: ['✓', '✓', '✓'] },
        { label: 'تأكيد طلبات الدفع عند الاستلام', values: ['✓', '✓', '✓'] },
        { label: 'متابعة السلات المتروكة', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'التكاملات والدعم',
      rows: [
        { label: 'API ومفاتيح وصول', values: ['✓', '✓', '✓'] },
        { label: 'عقدة n8n الموثّقة و Google Sheets و Meet', values: ['✓', '✓', '✓'] },
        { label: 'الدعم', values: ['بريد إلكتروني', 'بأولوية', 'مخصص + SLA'] },
        { label: 'تجربة مجانية', values: ['—', '14 يومًا', '14 يومًا'] },
      ],
    },
  ],
  en: [
    {
      title: 'Team & workspaces',
      rows: [
        { label: 'Workspaces', values: ['1', '3', '10'] },
        { label: 'Team members', values: ['2', '10', 'Unlimited'] },
        { label: 'Inbox agents', values: ['2', '10', 'Unlimited'] },
        { label: 'Storage', values: ['5 GB', '50 GB', '500 GB'] },
        { label: 'Roles & permissions', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'Inbox & channels',
      rows: [
        { label: 'WhatsApp, Instagram and Messenger in one inbox', values: ['✓', '✓', '✓'] },
        { label: 'WhatsApp numbers', values: ['1', '3', 'Unlimited'] },
        { label: 'WhatsApp messages per month', values: ['1,000', '20,000', 'Unlimited'] },
        { label: 'WhatsApp templates', values: ['10', '50', 'Unlimited'] },
        { label: 'Automatic conversation routing', values: ['✓', '✓', '✓'] },
        { label: 'Internal notes and saved replies', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'AI agents',
      rows: [
        { label: 'AI agents', values: ['1', '5', 'Unlimited'] },
        { label: 'AI credits per month', values: ['100', '5,000', 'Unlimited'] },
        { label: 'Knowledge sources', values: ['3', '25', 'Unlimited'] },
        { label: 'Knowledge storage', values: ['25 MB', '500 MB', 'Unlimited'] },
        { label: 'Advanced AI models', values: ['—', '✓', '✓'] },
        { label: 'Concurrent runs', values: ['1', '5', 'Unlimited'] },
        { label: 'Handover to a teammate and conversation summary', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'Contacts & CRM',
      rows: [
        { label: 'Contacts', values: ['1,000', '25,000', 'Unlimited'] },
        { label: 'Custom fields, tags and notes', values: ['✓', '✓', '✓'] },
        { label: 'Customer stages', values: ['✓', '✓', '✓'] },
        { label: 'Segments and import from CSV and Excel', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'Campaigns & automation',
      rows: [
        { label: 'WhatsApp campaigns per month', values: ['5', '30', 'Unlimited'] },
        { label: 'Campaign reports', values: ['✓', '✓', '✓'] },
        { label: 'Automations', values: ['3', '20', 'Unlimited'] },
      ],
    },
    {
      title: 'E-commerce',
      rows: [
        { label: 'Shopify, WooCommerce and EasyOrders connections', values: ['✓', '✓', '✓'] },
        { label: 'Cash-on-delivery order confirmation', values: ['✓', '✓', '✓'] },
        { label: 'Abandoned-cart follow-up', values: ['✓', '✓', '✓'] },
      ],
    },
    {
      title: 'Integrations & support',
      rows: [
        { label: 'API and access keys', values: ['✓', '✓', '✓'] },
        { label: 'Verified n8n node, Google Sheets and Meet', values: ['✓', '✓', '✓'] },
        { label: 'Support', values: ['Email', 'Priority', 'Dedicated + SLA'] },
        { label: 'Free trial', values: ['—', '14 days', '14 days'] },
      ],
    },
  ],
};
