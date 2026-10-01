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
| App links (sign-up, login), email, WhatsApp, socials, demo link, docs link | `src/config/site.ts` |
| Header navigation | `src/data/nav.ts` |
| FAQ questions and tabs | `src/data/faq.ts` |
| Plans, prices, plan features | `src/data/plans.ts` |
| Pricing comparison table | `src/data/compare.ts` |
| Privacy policy, terms | `src/content/legal/*.md` (set `draft: false` once reviewed) |
| Home sections | `src/components/home/*.astro` |
| Header, footer, icons | `src/components/Header.astro`, `Footer.astro`, `Icons.astro` (SVG sprite) |
| Section heading, CTA pair | `src/components/ui/SectionHead.astro`, `CtaPair.astro` |
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
  components/             Header, Footer, Icons, ReviewToggle
  components/home/        14 home-page sections
  components/ui/          SectionHead, CtaPair (shared section building blocks)
  components/pricing/     PlanCard, BillingToggle, CompareTable
  styles/landing.css      design system and section styles
  styles/site.css         Astro-specific additions
  styles/v2.css           home redesign: gradient tiles, dark panels, bands, FAQ, footer
  scripts/landing.js      all interactions (guarded per page)
  assets/                 images Astro optimises (hero screenshots)
public/                   fonts, favicon, og.png, robots.txt
```

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Purpose |
|---|---|
| `PUBLIC_CONTACT_ENDPOINT` | URL that receives the contact form as JSON (`POST`). An n8n webhook works well. Empty: the form shows a notice instead of sending. |
| `PUBLIC_SHOW_REVIEW` | `true` shows design-review tags. Keep `false` in production. |

## Deploy

### Coolify (Dockerfile)

1. New resource → this repository → build pack **Dockerfile**.
2. Port **80**. Domain **orqo.site** (and `www.orqo.site` if wanted).
3. Optional build args: `PUBLIC_CONTACT_ENDPOINT`.

The image builds the site and serves `dist/` with nginx (`nginx.conf`): clean URLs (each page is built as `page/index.html`, so `/pricing` and `/pricing/` both work on any static host), long caching for hashed assets, and the custom 404 page.

### Cloudflare Pages / Netlify / any static host

Build command `npm run build`, output directory `dist`, Node 22.

## Fonts

Neo Sans Arabic (Regular and W23 Medium) is self-hosted from `public/fonts/`, subset to Arabic and Latin as WOFF2 (about 44 KB each). Confirm the licence covers public web use.
