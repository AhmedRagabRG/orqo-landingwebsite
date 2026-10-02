/**
 * Site-wide settings. Everything marked SAMPLE is placeholder data to replace before launch.
 * Values starting with PUBLIC_ can be overridden from the environment (.env / hosting settings).
 */
const env = import.meta.env;

export const site = {
  name: 'ORQO',
  url: 'https://orqo.site',
  email: 'info@orqo.site',

  // The ORQO app (Laravel) lives on its own subdomain.
  appUrl: 'https://app.orqo.site',
  signupUrl: 'https://app.orqo.site/register',
  loginUrl: 'https://app.orqo.site/login',
  docsUrl: '/contact', // SAMPLE: replace with the API docs URL

  // English site URL (e.g. '/en'). Empty hides the EN / English links until the English pages exist.
  englishUrl: '',

  // SAMPLE contact details (see ASSETS_NEEDED C1–C4)
  whatsappUrl: '#', // e.g. https://wa.me/20XXXXXXXXXX
  demoUrl: '#', // e.g. a Google Calendar appointment page
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },

  // Where the contact form posts JSON (an n8n webhook works well). Empty = form shows a notice instead.
  contactEndpoint: env.PUBLIC_CONTACT_ENDPOINT ?? '',

  // Show the orange review tags and placeholder highlights (design review mode).
  showReview: env.PUBLIC_SHOW_REVIEW === 'true',
};
