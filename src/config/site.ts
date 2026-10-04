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

  // English site URL (e.g. '/en'). Empty hides the EN / English links until the English pages exist.
  englishUrl: '',

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

  // Show the orange review tags and placeholder highlights (design review mode).
  showReview: env.PUBLIC_SHOW_REVIEW === 'true',
};
