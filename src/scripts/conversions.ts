// One delegated click handler prevents duplicate markup bindings. No form values or query strings.
type AnalyticsWindow = Window & {
  ORQOConsent?: { granted: () => boolean };
  gtag?: (...args: unknown[]) => void;
};
function track(name: string, placement: string) {
  const w = window as AnalyticsWindow;
  if (!w.ORQOConsent?.granted()) return;
  w.gtag?.('event', name, {
    page_path: location.pathname,
    language: document.documentElement.lang,
    placement,
    page_group: document.body.dataset.page || 'other',
    transport_type: 'beacon',
  });
}
document.addEventListener('click', event => {
  const link = event.target instanceof Element ? event.target.closest('a') : null;
  if (!link) return;
  const url = new URL(link.href, location.href);
  const placement = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content';
  if (url.origin === 'https://app.orqo.site' && url.pathname === '/register') {
    track('signup_click', placement);
    if (document.body.dataset.page === 'pricing') track('pricing_cta_click', placement);
    if (document.body.dataset.page === 'compare') track('comparison_signup_click', placement);
  } else if (url.origin === location.origin && /^\/(ar\/)?contact\/?$/.test(url.pathname) && !/^\/(ar\/)?contact\/?$/.test(location.pathname)) {
    track('demo_request_click', placement);
  }
});
window.addEventListener('orqo:contact-success', () => track('contact_form_submit', 'contact_form'));
