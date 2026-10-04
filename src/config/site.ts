/**
 * Site-wide settings. Everything marked SAMPLE is placeholder data to replace before launch.
 * Values starting with PUBLIC_ can be overridden from the environment (.env / hosting settings).
 */
const env = import.meta.env;

export const site = {
  name: 'ORQO',
  url: 'https://orqo.site',
  email: 'hello@orqo.site',

  // The ORQO app (Laravel) lives on its own subdomain.
  appUrl: 'https://app.orqo.site',
  signupUrl: 'https://app.orqo.site/register',
  loginUrl: 'https://app.orqo.site/login',
  docsUrl: '/contact', // SAMPLE: replace with the API docs URL

  // Contact details
  whatsappUrl: 'https://wa.me/201557730414',
  whatsappDisplay: '+20 15 57730414',
  demoUrl: '#', // e.g. a Google Calendar appointment page
  social: {
    facebook: 'https://www.facebook.com/orqo.site/',
    instagram: 'https://www.instagram.com/orqo.ai/',
    linkedin: 'https://www.linkedin.com/company/103601046/',
  },

  // Where the contact form posts JSON (an n8n webhook works well). Empty = form shows a notice instead.
  contactEndpoint: env.PUBLIC_CONTACT_ENDPOINT ?? '',

  // PostHog web analytics. Empty key = no tracking script is rendered at all.
  posthogKey: env.PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

  // Google Analytics 4. Defaults to the production measurement ID; set PUBLIC_GA_ID to a
  // different ID to override, or to an empty string to disable gtag entirely.
  gaId: env.PUBLIC_GA_ID ?? 'G-E85HF1Y9NY',

  // Microsoft Clarity (session recordings & heatmaps). Defaults to the production project ID;
  // set PUBLIC_CLARITY_ID to override, or to an empty string to disable Clarity entirely.
  clarityId: env.PUBLIC_CLARITY_ID ?? 'ysmjkyk3yw',

  // Show the orange review tags and placeholder highlights (design review mode).
  showReview: env.PUBLIC_SHOW_REVIEW === 'true',
};
