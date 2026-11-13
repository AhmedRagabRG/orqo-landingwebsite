# ORQO SEO audit

Audited 13 November 2026. This report distinguishes repository findings, live HTTP observations and local verification after implementation. Changes remain local and are not deployed.

## Architecture and inspected scope

The marketing site is **Astro 7.3.5**, static output, with Astro content collections for legal Markdown and an existing sitemap integration. It is not the Laravel application or the separate documentation frontend. The shared layout renders full HTML at build time; essential content does not depend on client rendering. Existing vanilla JavaScript handles navigation, pricing currency, forms and illustrations. Styling uses the existing Neo Sans Arabic/IBM Plex fonts, mint/teal tokens and responsive CSS.

English canonical URLs are unprefixed, Arabic equivalents use `/ar`, and `/en` is a legacy alias. The repository and live redirects prefer **https://www.orqo.site**. This host is retained rather than introducing an unnecessary domain migration. The supplied `https://orqo.site` redirects to it.

Original indexable inventory: `/`, `/pricing`, `/contact`, `/privacy`, `/terms`, and their five Arabic equivalents. Original error route: `/404.html`. Original `/en` aliases are static redirect documents. Public sitemap, robots, llms file, images/fonts, contact endpoint configuration, analytics components, Vercel and nginx deployment configuration were inspected. The public API documentation was retrieved, but no authenticated app, billing, messaging infrastructure or production secret was accessed or modified.

Sources of evidence:

- `evidence/live-http.json`: 12 public HTTP checks, including the apex, www, HTTP, legacy English URLs, trailing slash, robots, sitemap, documentation and an unknown URL.
- `evidence/live-original-pages.json`: original ten public pages, titles/canonicals/alternates/H1s.
- `evidence/baseline-assets.json`: initial local built asset sizes before SEO implementation.
- `evidence/browser-checks.json`: local HTTP, browser, responsive, accessibility and consent/event results.
- `evidence/lighthouse.json`: local mobile laboratory results and settings described in the implementation report.

The web retrieval tool could not open the live ORQO hosts directly. System curl successfully retrieved them with normal certificate validation. Python urllib's local certificate store initially failed, which was not treated as proof of a site certificate defect.

## Prioritized findings and resolution

| Severity | Original finding / evidence | Impact | Resolution / remaining work |
| --- | --- | --- | --- |
| Critical | No confirmed critical crawl-blocking failure in the inspected public pages | Do not invent a critical finding where static content and public responses work | Continue monitoring in Search Console after authorized deployment |
| High | `/en` and `/en/pricing` returned HTTP 200 with redirect documents rather than edge 3xx | Weak normalization and unnecessary redirect-page fetching | Permanent Vercel rules plus nginx rewrites prepared. Static fallback retained; live edge execution requires approved deployment |
| High | No dedicated feature, solution, comparison, alternative or article architecture | Product and buying-intent topics had no substantive owning URLs | Added 15 researched topic pairs plus five hub pairs: 40 new localized routes |
| High | Existing GA/Clarity loaded without a visitor choice; no explicit marketing conversion model | Privacy choice absent and marketing intent difficult to measure consistently | Consent-gated loaders, withdrawal, masked form and deliberate GA events; account/privacy review remains manual |
| Medium | Arabic pages omitted English `x-default`; 404 generated an alternate to nonexistent `/ar/404` | Inconsistent locale annotations and invalid error-page alternates | Equivalent self/alternate/x-default sets on both languages; no error-page alternates |
| Medium | Footer linked `/#journey` after that home section was removed; legal terms linked `privacy.html` | Broken navigation and weak internal discovery | Link footer to AI page; repair both legal links; crawl all generated anchors and pages |
| Medium | Documentation setting pointed to contact; `llms.txt` described missing anchors and stale pricing generalizations | Incorrect product references for readers/crawlers | Use live developer-docs URL; replace stale references with canonical hubs and cautious product description |
| Low | Arabic Open Graph locale used `ar_AR` | Poor geographic metadata for the intended Arabic market | Use `ar_EG` and reciprocal English locale metadata |
| Medium | Twitter had a card type but no explicit title/description/image; social image alt text absent | Incomplete share metadata, reliance on fallback behavior | Shared complete Open Graph/Twitter metadata and localized image descriptions |
| Medium | Homepage title was broad and English description lengthy | Less explicit alignment with the core shared-inbox proposition | Clear channel-specific titles and a concise English description; no unsupported keyword metrics |
| Medium | Only homepage SoftwareApplication data; no consistent organization/site/breadcrumb/article entities | Limited structured explanation of site and content relationships | Shared Organization/WebSite, retained SoftwareApplication, visible BreadcrumbList and BlogPosting where applicable |
| Medium | Initial global CSS was 142,576 bytes (27,603 gzip); Lighthouse identifies unused rules | Unnecessary delivery, especially on prose pages | No heavy purge applied during SEO work; measured bottleneck recorded for a route-specific CSS follow-up with visual coverage |
| Medium | Three existing contrast patterns failed automated AA checks: campaign small text, reports label, white text on bright WhatsApp button | Readability/accessibility failures | Targeted foreground changes within current palette; subsequent representative A/AA tests pass |
| Low | Four fonts preloaded, including mono medium | Extra early network work | Removed mono-500 preload; keep font-face and actual font available when needed |
| Low | Functional chat widget was requested asynchronously during initial page loading | Third-party request competes with startup | Defer the existing widget until window load; retain function and key |
| Low | No durable automated SEO checks or content publication safeguards | Future changes could silently break canonical/locale/link correctness | Eight output regression groups, representative browser suite, typed schema, paired translation/related-content validation |
| Low | Font caching differed between Vercel and nginx; unversioned nginx fonts marked immutable for a year | Revalidation overhead on one host and stale-update risk on another | Prepare consistent seven-day cache policy with stale revalidation; hashed build assets keep existing immutable caching |

Severity describes practical priority, not a claim about a measured ranking penalty. Missing an explicit `index` directive was not itself a defect—indexing is normally allowed by default. The new explicit directives make intentions reviewable.

## Findings by audit area

**Crawlability, rendering and HTML:** Original pages were statically rendered with one H1. Semantic header/nav/main/footer, skip link and labeled forms existed. New content remains static and uses a single H1, ordered headings, visible FAQs and native links. No client-only content wall or heavy UI framework added.

**Metadata and duplicates:** Original title/description/canonical support existed. Canonical domain was already www. Final checks cover exact title/description uniqueness, one self canonical, social URL agreement and no `/en` inventory. Reused CTA and legal boilerplate are intentional; localized main bodies are written separately. No search-engine duplicate-content or plagiarism service was used.

**Sitemap:** Existing `@astrojs/sitemap` is retained. Final sitemap contains exactly the 50 indexable canonical pages, including all new categories in both languages. Errors, redirects, drafts and API routes are excluded. Only articles with a real editorial modification date get `lastmod`; undated pages omit it. No build-time date is fabricated.

**Robots and private areas:** Public marketing content remains crawlable. Local API/private-looking paths are disallowed and Vercel API responses are configured noindex. No private application route is added to the sitemap. Robots is not authentication, and marketing-host robots does not control `app.orqo.site`. The app owner must validate authentication and indexing rules on that host independently; no app code was changed.

**Redirects and statuses:** Live apex HTTPS returned one redirect to www; HTTP apex required two hops. Live unknown route returned 404; `/pricing.html` returned 404. `/pricing/` was served 200. Permanent legacy-locale redirects and no-trailing-slash rules are prepared for both documented deployment paths. TLS and apex policy remains at the host/ingress. No production redirect or cache header is claimed fixed until deployment and an edge check. Combined scheme/host/legacy variants must be reviewed for chains on the real host.

**Internal links:** Hubs are linked from the footer; features and guides also appear in primary navigation. Homepage/footer → hubs → leaf pages; leaf → related features, solutions, guides/comparisons and pricing/contact/signup. All 50 pages are reachable through normal links from home, including language switching. Both Arabic and English legal privacy links now resolve. Local tests check page anchors, assets and image paths; they do not assert that every third-party social account is available to every region.

**Images/fonts:** Existing high-priority responsive WebP hero is retained with dimensions and without lazy loading. New screenshots reuse the actual full inbox image through Astro image optimization, intrinsic dimensions, responsive sizes and below-fold lazy loading. Existing social image is reused, not fabricated. Self-hosted fonts retain swap behavior. No stock or invented screenshots were introduced.

**Language/accessibility/mobile:** Preserve English `/`, Arabic `/ar`, `lang`, RTL and logical CSS. All final alternate sets are reciprocal and resolve to equivalent pages, with self canonicals. New copy, FAQs, metadata and interfaces are localized; original product screenshot text and proper brand/source names remain as originally captured. Browser checks cover 320/768/1024/1440 widths and representative page types; automated accessibility coverage is not a complete manual assistive-technology audit. Existing and new keyboard navigation is exercised for the menu and language switch.

**Structured data:** JSON-LD parses and semantic regression checks cover known types, breadcrumbs, article dates/author/publisher and canonical identity. No fabricated ratings, reviews, offers, customer counts or pricing claims. SaaS FAQs stay visible without a rich-result promise. Google Rich Results Test and Search Console enhancement reports were not executed, so no Google acceptance is claimed.

**Analytics:** Existing GA/Clarity and optional PostHog were inspected. No prior real conversion data or account configuration was accessible. Explicit events measure intent and relay acceptance; completed signup requires app-owned measurement. Setup details and privacy/account review are in `analytics-setup.md`.

**Performance:** Before/after asset and local mobile lab observations are recorded. LCP/CLS/TBT are laboratory observations; TBT is not field INP. Search Console, CrUX, real-user CWV and production TTFB by region were not available. A few curl request timings are point observations, not a latency benchmark or SLA.

**AI discoverability/authority:** Improve readable descriptions, structured entities, source-backed buying guides, real documentation links and clear public information. The concise llms reference is maintained as documentation, with no claim of crawler support, ranking advantage or guaranteed AI placement. Off-page actions are documented, not executed.

## Publication limits

Standalone Instagram and Messenger pages were not created just to repeat the inbox page. A Web Chat marketing feature was not published without fuller product-scope verification; observing a functional site widget alone does not establish every customer-facing capability. The other five competitor pages and Wati/Manychat alternative pages remain research priorities rather than thin duplicates. Six example blog topics were evaluated; three original bilingual guides were written, with the remaining distinct guides prioritized in the roadmap.

See `implementation-report.md`, `competitor-research.md`, `keyword-strategy.md`, `analytics-setup.md`, `off-page-strategy.md`, `content-management.md` and `roadmap.md` for implementation, sources, limitations and next actions.
