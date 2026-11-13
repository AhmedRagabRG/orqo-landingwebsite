# Maintaining the SEO content system

## Architecture

Astro 7.3.5 produces static HTML. The existing content collections, Zod, Markdown renderer, `astro:assets` and `@astrojs/sitemap` are reused. No CMS, runtime frontend framework or new project dependency was added.

- Shared settings: `src/config/site.ts`.
- Canonical URL, language alternates, JSON-LD serialization and entity definitions: `src/lib/seo.ts` and `src/layouts/Base.astro`.
- Validated content: `src/content/marketing/{en,ar}/{kind}/{slug}.md`.
- Collection schema: `src/content.config.ts`. File-based IDs explicitly include locale and kind; a frontmatter slug cannot silently overwrite the translated entry.
- Shared content queries, labels and hub copy: `src/lib/marketing.ts`.
- Route templates: `src/pages/[...slug].astro` and `src/pages/ar/[...slug].astro`.
- Page, listing and breadcrumbs: `src/components/seo/`.
- Article/landing-page styling: `src/styles/seo.css`, reusing existing design tokens.
- Existing routes remain dedicated Astro pages. English is unprefixed, Arabic uses `/ar`. `/en` is a legacy redirect.

## Add a page

Create an English and Arabic Markdown file with the same `kind` and `slug`. Supported kinds are `features`, `solutions`, `compare`, `alternatives` and `blog`. Put a clear H1 in `heading`; body headings start at H2. The page template renders the H1.

```yaml
---
lang: en
kind: features
slug: verified-feature
# Keep the title unique across all pages; metadata is not copied from another feature.
title: 'Verified feature and useful outcome | ORQO'
description: 'A unique, accurate description of the verified workflow and what the reader will learn from this page.'
heading: 'A clear heading for the feature'
intro: 'A useful introduction written for the intended customer.'
draft: true
related:
  - /features/omnichannel-inbox
  - /solutions/ecommerce
faq:
  - q: 'A practical question?'
    a: 'An accurate answer supported by the product.'
  - q: 'Another useful question?'
    a: 'The relevant answer, with limitations when needed.'
---

## The problem this solves

Write substantive content that can stand on its own.
```

Use `lang: ar` for the equivalent Arabic file and translate title, description, heading, intro, body, FAQs, source labels and screenshot alt text naturally. Slugs remain identical. Do not put a locale prefix in `related`; the template adds it. Markdown body links **are literal** and must use `/ar/...` in Arabic content. Absolute documentation and source links keep their external host.

A published entry must have a published translation and at least two existing related entries; build validation rejects incomplete pairs and broken related references. Both routes and hubs are generated from the collection. A page with `draft: true` is not rendered or included in the sitemap. Keep a pair in draft until both are ready.

## Editorial requirements by type

- **Feature:** verified capability, customer problem, meaningful workflow, limitations to check, relevant FAQs and CTA. Combine tightly related channel pages when a separate page would be thin.
- **Solution:** a distinctive industry process. Label examples as proposed workflows; avoid suggesting unverified integrations or outcomes.
- **Comparison / alternative:** `reviewed: 'YYYY-MM-DD'` and at least one official source are required. A comparison is a two-product evaluation; alternatives are a useful multi-product selection guide. Include suitability in both directions and a billing-model qualification. Never make an unverified “cheaper” claim.
- **Blog:** `published` and `updated` are required ISO dates, with `author` (default ORQO organization). Use actual editorial dates and update only when the article substantively changes. Initial dates reflect authoring on 13 November 2026, not a claim that these new URLs were already live.
- **Screenshot:** optional `screenshot: inbox` uses an existing responsive WebP product image; `screenshotAlt` is required in the page language. No fabricated product screen is generated. Add a new allowed asset explicitly to the schema/template if one is needed.
- **FAQ:** visible HTML uses native disclosure elements. No automatic FAQ rich-result claim or FAQPage markup is emitted for these SaaS marketing pages.

Sources take `{ label, url }` with HTTPS URLs. Add the review date only after actually checking them. Do not use a build timestamp as a factual review date.

## Sitemap and metadata

`@astrojs/sitemap` remains the only sitemap producer. Its filter excludes legacy English redirects, errors, API paths and any generated noindex page. URLs and locale links use HTTPS/www with no trailing slash except root. Optional `lastmod` is taken from rendered article modification metadata; undated pages omit it. The integration reads the configured current `dist` output after pages are generated. If changing `outDir`, update that integration helper and its regression tests together.

The shared head provides self canonicals, complete Open Graph/Twitter tags, language, robots, reciprocal English/Arabic alternates and English `x-default` on both versions. The 404 is noindex and has no fictitious language alternates. JSON-LD escapes `<` to avoid breaking out of a script element.

## Validation

```sh
npm run check
npm test
```

`npm test` builds and runs eight standard-library Python regression groups against **all** generated pages. Python 3 is required. Coverage includes expected inventory, metadata uniqueness, canonical/hreflang reciprocity, HTML language/direction, headings, internal page links and anchors, image dimensions, asset existence, reachability, sitemap parity, structured data and editorial relationships.

Optional browser verification uses tools installed **outside** the repository:

```sh
npm install --prefix /tmp/orqo-seo-tools --no-save --package-lock=false playwright lighthouse @axe-core/playwright
npm run preview -- --host 127.0.0.1
node scripts/seo-browser.mjs
```

The browser script requires an installed Google Chrome. Set `ORQO_SEO_TOOLS` to the external tools directory or `ORQO_PREVIEW_URL` to a different local preview origin. It blocks third-party traffic, stubs the contact endpoint and never sends a real message. It verifies representative routes, responsive widths, WCAG A/AA rules, language/navigation, consent and GA event queues. Output and screenshots go to `docs/seo/evidence/`. This is automated coverage, not a complete accessibility certification or a live account integration test.

## Official implementation references

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro static route generation](https://docs.astro.build/en/guides/routing/#static-ssg-mode)
- [Astro sitemap serialization](https://docs.astro.build/en/guides/integrations-guide/sitemap/#serialize)
- [Google localized-page linking](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
