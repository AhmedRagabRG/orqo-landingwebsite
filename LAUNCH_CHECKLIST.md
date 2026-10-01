# Launch checklist

Everything below is sample or placeholder content today. Where to change it:

- Links, email, WhatsApp, socials, demo link: `src/config/site.ts`
- Plans and prices: `src/data/plans.ts`; comparison table: `src/data/compare.ts`
- Legal text: `src/content/legal/privacy.md`, `src/content/legal/terms.md` (set `draft: false` after legal review)
- Section copy and illustrations: `src/components/home/*.astro`, `src/pages/*.astro`
- Contact form destination: `PUBLIC_CONTACT_ENDPOINT` (see `.env.example`)

Run a review build (`PUBLIC_SHOW_REVIEW=true npm run build`) to see every item below tagged in orange on the pages.

## Assets and content still needed

Everything else (channel-flow graphics, connectors, icons, flow diagram, template preview, pricing feature illustrations, usage meters, device frames, the arc motif) was built in code. The IDs match the orange review tags on the pages.

Screenshot guidance: seed with `php artisan demo:seed-ad --reset --state=<state>`, Arabic UI, light theme, browser at 1920×1080 or wider, 2× pixel ratio if possible, PNG, no browser chrome, no Xnapper watermark.

## Product screenshots (home page)

The homepage is now illustrated, and only the hero uses a real screenshot. A1–A6 are **optional upgrades**: each section already works with its drawn illustration, so add real captures only where you want proof next to the drawing.

| ID | What | Exact UI state | Where | Size |
|---|---|---|---|---|
| A1 | Screen recording of Mona's journey | States `ai-assigned` → `booked`, 20–30 s, cursor hidden, no audio | AI journey stage | 1600×1000, MP4 + WebM, ≤ 3 MB |
| A2 | AI Agent settings | Agent "ليلى": instructions, tone, knowledge sources (one PDF, one URL, FAQ), handoff rules, business hours | "وكيل تبنيه حول عملك" | 1600×1000 per tab |
| A3 | Automation builder | Message received → out of hours? → (AI reply \| assign) → wait 2 days → send template; canvas fit, no side panel | Automation section | 1200×1400 portrait |
| A4 | Pipeline board | State `booked`, Mona in Booked, other contacts across stages | Pipeline section | 1920×900 |
| A5 | Campaigns | (a) wizard on template step with approved Arabic template; (b) a finished campaign report | Campaigns section | 1400×1000 each |
| A6 | Reports overview | Overview tab, ≥ 2 weeks of demo data | Reports section | 1920×1100 |

## Proof and brand

| ID | What | Where | Notes |
|---|---|---|---|
| A7 | Customer testimonial: Arabic quote, name, role, company, square headshot, permission | Trust section | Can't be invented |
| A8 | 4–8 customer logos with permission | Trust section | SVG, transparent |
| A9 | Official Meta Tech Provider badge artwork (if Meta provides one) and confirmation of the exact wording Meta allows | Hero, trust, footer, contact | Currently a neutral "Meta Tech Provider" chip with the Meta logo |
| A10 | Approved security statement (hosting region, encryption, access control) | Trust section | Legal claim |
| A11 | Official n8n and Google Meet logos (and the link to the ORQO node in n8n) | Integrations, pricing | Currently neutral icons |
| A12 | Final routes: sign-up, login, API docs, privacy, terms, demo booking | All CTAs | All `#` anchors now |
| A13 | Go-ahead for a full English adaptation | Language switch | — |
| A14 | Confirmation that the Neo Sans Arabic licence covers public web embedding | Whole site | I can swap to a Google font if not |

## Pricing page

| ID | What to confirm |
|---|---|
| P1 | Real plan names, prices, yearly prices and limits. Current values come from `database/seeders/PlanSeeder.php` (the sample catalogue): Free $0, Pro $29/$290, Business $99/$990. Also confirm the 14-day trial is configured on the Creem products. |
| P2 | That every feature (AI agents, campaigns, automations, COD confirmation, API, integrations) really is available on the Free plan, limited only by usage. The code gates only limits and `ai_advanced_tier`. |
| P3 | How Meta's WhatsApp conversation fees are charged (paid by the customer directly to Meta, or through ORQO). The FAQ answer is drafted assuming they are separate. |
| P4 | How COD order confirmation works in the product (which stores, buttons, what happens to the order after the customer confirms or cancels). No dedicated COD module was found in the code, so the card describes it as an order trigger + WhatsApp confirmation + recorded reply. |

## Contact page

| ID | What |
|---|---|
| C1 | WhatsApp business number (and whether it should open a wa.me link) |
| C2 | Phone numbers (Egypt / Saudi), working hours, office address (or confirm you don't want an address) |
| C3 | Demo booking link (Google Calendar appointment page, Calendly, etc.) |
| C4 | Social profile URLs: Facebook, Instagram, LinkedIn, X, YouTube, TikTok (remove any you don't use) |
| C5 | Where the contact form should send (email, CRM, n8n webhook, or ORQO itself) |

`info@orqo.site` is already used, taken from the product's billing and integrations pages.

## Legal pages (privacy.html, terms.html)

Both pages are drafts written from what the product actually does. They need a lawyer's review before publishing. Highlighted placeholders show in review mode.

| ID | What |
|---|---|
| L1 | Legal review of both pages; company legal name, registered address, governing law and courts, refund policy, liability cap, data-retention periods, SLA terms |
| L2 | Confirm the processors used in production. The list comes from the code's config: Meta, Clerk, Creem, Appwrite, OpenAI/Anthropic/Gemini, Qdrant, Pusher, OneSignal, PostHog, Sentry, plus the email provider in use |
| L3 | The data-deletion mechanism Meta requires (instructions URL or deletion callback) and whether customer data is ever used to train models |
