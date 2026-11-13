# ORQO website

Marketing site for ORQO, served at **orqo.site**. The app itself lives at **app.orqo.site** (the `orqo-nv` repo).

Arabic-first (RTL), built with [Astro](https://astro.build) as a fully static site. There is no UI framework: interactive parts are small vanilla scripts.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
npm run check      # type and template checks
```

Review mode shows the orange design-review tags and highlighted placeholders:

```bash
PUBLIC_SHOW_REVIEW=true npm run dev
```

## Pages

| URL | File |
|---|---|
| `/` | `src/pages/index.astro` (one component per section in `src/components/home/`) |
| `/pricing` | `src/pages/pricing.astro` |
| `/contact` | `src/pages/contact.astro` |
| `/privacy`, `/terms` | Markdown in `src/content/legal/`, rendered by `src/layouts/Legal.astro` |
| 404 | `src/pages/404.astro` |

## Where to edit content

| What | Where |
|---|---|
| App links (sign-up, login), email, WhatsApp, socials (Facebook, Instagram, LinkedIn), demo link, docs link, English site link (empty hides it) | `src/config/site.ts` |
| Header navigation | `src/data/nav.ts` |
| FAQ questions and tabs (home and pricing) | `src/data/faq.ts` |
| Plans, prices, plan features | `src/data/plans.ts` |
| Pricing comparison table | `src/data/compare.ts` |
| Privacy policy, terms | `src/content/legal/*.md` (set `draft: false` once reviewed) |
| Home sections | `src/components/home/*.astro` |
| Header, footer, icons | `src/components/Header.astro`, `Footer.astro`, `Icons.astro` (SVG sprite) |
| Shared building blocks: section heading, page hero, FAQ, CTA pair, Meta badge | `src/components/ui/` |
| Closing CTA in the footer | `src/components/FooterCta.astro` |
| Colours, fonts, spacing | `:root` tokens at the top of `src/styles/landing.css` |

All prices, limits, phone numbers and social links are **sample data** for now. See [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md).

## Structure

```
src/
  config/site.ts          site-wide links and settings
  data/                   nav, plans, comparison table, FAQ
  content/legal/          privacy.md, terms.md
  layouts/Base.astro      <head>, SEO, header, footer, scripts
  layouts/Legal.astro     legal page template (auto contents + numbering)
  components/             Header, Footer, FooterCta, Icons, ReviewToggle
  components/home/        home-page sections
  components/ui/          SectionHead, PageHero, Faq, CtaPair, MetaBadge (used on every page)
  components/pricing/     PlanCard, BillingToggle, CompareTable
  styles/landing.css      design system and section styles
  styles/site.css         Astro-specific additions
  styles/sections.css     section system: headings, panels, campaigns, inbox, bento, FAQ, footer
  scripts/landing.js      all interactions (guarded per page)
  assets/                 images Astro optimises (hero screenshots)
public/                   fonts, favicon, og.png, robots.txt
```

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Purpose |
|---|---|
| `PUBLIC_CONTACT_ENDPOINT` | URL that receives the contact form as JSON (`POST`). An n8n webhook works well. Empty uses the existing `/api/telegram` relay. |
| `PUBLIC_SHOW_REVIEW` | `true` shows design-review tags. Keep `false` in production. |

## Deploy

### Vercel

Use `npm run build` with `dist` as the output directory. The `/api/currency`
function reads Vercel's `x-vercel-ip-country` request header so visitors from
Egypt see EGP, visitors from Saudi Arabia see SAR, and all other visitors see
USD. If geolocation is unavailable, the static site keeps its USD prices.

### Coolify (Dockerfile)

1. New resource → this repository → build pack **Dockerfile**.
2. Port **80**. Canonical domain **www.orqo.site**; configure HTTPS and redirect `orqo.site` to it at the trusted ingress.
3. Optional build args: `PUBLIC_CONTACT_ENDPOINT`.

The image builds the site and serves `dist/` with nginx (`nginx.conf`): clean URLs (each page is built as `page/index.html`), permanent legacy `/en` and trailing-slash normalization, long caching for hashed assets, and the custom 404 page. Other static hosts need equivalent HTTP redirect rules; Astro redirect documents are a fallback.

### Cloudflare Pages / Netlify / any static host

Build command `npm run build`, output directory `dist`, Node 22.

## Fonts

Neo Sans Arabic (Regular and W23 Medium) is self-hosted from `public/fonts/`, subset to Arabic and Latin as WOFF2 (about 44 KB each). Confirm the licence covers public web use.


## SEO content and verification

Read [the implementation report](docs/seo/implementation-report.md), [SEO audit](docs/seo/seo-audit.md), [content guide](docs/seo/content-management.md), [analytics setup](docs/seo/analytics-setup.md) and [30/60/90-day roadmap](docs/seo/roadmap.md).

New feature, solution, comparison, alternative and blog pages use paired Arabic/English Markdown under `src/content/marketing/`. Metadata, locale links, listings and sitemap entries are generated consistently. Run `npm run check` and `npm test` (Python 3 required) before release. Optional browser/Lighthouse checks are documented in the content guide. Production deployment still requires approval.
