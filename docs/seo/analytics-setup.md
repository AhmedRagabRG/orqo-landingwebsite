# Analytics and conversion setup

13 November 2026. Existing GA4, Microsoft Clarity and optional PostHog integrations were retained. No account, secret, DNS record or production environment variable was changed. GTM was not added because it would duplicate the direct GA integration without an established need.

## Implemented behavior

- An Arabic/English privacy choice appears before optional analytics is allowed. Accept/decline have equal access; the footer reopens preferences.
- The versioned `orqo-analytics-consent-v1` localStorage value stores `granted` or `denied`. Storage errors do not break the page; a choice then lasts only for that document.
- GA4, Clarity and PostHog loaders wait for explicit analytics permission and document load, and guard against duplicate initialization. No analytics preconnect runs before permission.
- GA uses basic consent gating. Advertising storage, user data and personalization are denied; no GTM container is installed. Google Signals and ad personalization are disabled.
- GA's configured page location/referrer omit query strings and fragments. Explicit conversion payloads contain only path, language, page group and placement.
- PostHog automatic pageviews, pageleave, autocapture and session recording are disabled. It is not a second conversion destination. Its existing optional loader remains available for an intentional future setup.
- Clarity remains optional and follows the analytics choice. The contact form is explicitly masked. Validate recording/masking settings in the actual account before use.
- Withdrawal unloads initialized SDKs through a page reload and expires recognized analytics cookies on the relevant host/domain. Rejection before acceptance makes no analytics SDK request.
- The existing functional customer-chat widget is separate from analytics consent and now starts after initial document load. Review that service's data handling and update the privacy notice to describe actual practices.

This is a consent mechanism, not a representation that every jurisdiction or contractual obligation is satisfied. Have the responsible owner review the privacy text, data retention, vendor settings and the appropriate consent categories for the intended markets. Do not add advertising tags without reviewing consent and policy requirements.

## Public build configuration

| Variable | Purpose | Current behavior |
| --- | --- | --- |
| `PUBLIC_GA_ID` | GA4 measurement ID | Existing repository fallback `G-E85HF1Y9NY` preserved; explicit empty string disables |
| `PUBLIC_CLARITY_ID` | Clarity project ID | Existing repository fallback `ysmjkyk3yw` preserved; explicit empty string disables |
| `PUBLIC_POSTHOG_KEY` | PostHog public project key | Empty disables; no key added |
| `PUBLIC_POSTHOG_HOST` | Project region host | Existing US default preserved; if changing region, review CSP allowed hosts |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML verification token | Empty renders no verification tag |

These `PUBLIC_` values are browser-visible identifiers, never private service-account credentials. Production values require an authorized rebuild and deployment. `.env.example` documents the new verification field; no `.env` or production configuration was changed.

## Events and interpretation

| Event | Trigger | Interpretation |
| --- | --- | --- |
| `signup_click` | Click on the app registration URL | Intent, not a completed registration |
| `pricing_cta_click` | The same registration click on a pricing page | Separate segment event, not another signup |
| `comparison_signup_click` | The same registration click on a comparison page | Comparison-assisted click segment |
| `demo_request_click` | Internal navigation to contact from another page | Contact/demo intent, not a booked meeting |
| `contact_form_submit` | Existing form request returns a successful HTTP status | Contact request accepted by the configured relay; not proof of message delivery or sales qualification |

One delegated click handler binds once per document. Two different semantic events on a pricing/comparison CTA are intentional: do not sum them as independent signups. Form errors do not emit the success event. No form name, email, phone, message, customer identifier or raw outbound URL is included.

A local browser test intercepted the form endpoint; **no message was sent**. Local tests also blocked remote analytics scripts, inspected queued GA events, tested decline/accept/reload/withdrawal, and confirmed that a comparison click queues exactly one general event plus its segment event.

## Owner setup steps

1. **Search Console:** use a domain property for `orqo.site` where possible. Copy the verification TXT record from your own account into DNS manually. Alternatively, choose URL-prefix verification for `https://www.orqo.site/` and configure the public HTML token above. Submit `https://www.orqo.site/sitemap-index.xml` after an approved deployment. Inspect an English homepage, Arabic homepage, feature, comparison and article URL. Confirm Google's selected canonical and indexing status from the account; they were not verified here.
2. **GA4:** confirm ownership of the existing measurement ID and the intended web stream. Configure `www.orqo.site` and `app.orqo.site` cross-domain measurement only in coordination with the app's existing analytics owner. The app was not changed. Do not report completed signup until a real server/app event is safely available.
3. **Prevent duplicates:** review Enhanced Measurement outbound-click and form interactions. Disable automatic form interaction measurement if using the explicit contact success event for the same purpose. Do not add GTM to fire the same GA configuration/event tags. Use DebugView with test traffic and analytics permission to confirm one pageview per page and each intended event.
4. **Key events:** choose the meaningful success events deliberately. A contact form acceptance can be a marketing lead signal. Mark a future authenticated `sign_up` event only after implementation/validation in the app; do not relabel `signup_click` as completion.
5. **Reporting:** create landing-page and language reports with comparison and pricing groups. Filter internal/test traffic. Compare organic landing pages using Search Console and GA aggregates while acknowledging consent, blockers and attribution limits.
6. **Clarity/PostHog:** verify project ownership, region, retention and privacy controls. Keep PostHog empty unless it has a defined use. Test masking and data capture on a nonproduction environment; never paste private account keys into client configuration.
7. **Deployment:** deploy only after user approval, then repeat edge redirect, sitemap and live event validation. This task did not change hosting or account settings.

## Sources

- [Google consent implementation](https://developers.google.com/tag-platform/security/guides/consent)
- [GA4 cross-domain measurement](https://support.google.com/analytics/answer/10071811)
- [Google Search Console ownership verification](https://support.google.com/webmasters/answer/9008080)
