// Optional browser checks. Install test tools outside the project; see docs/seo/content-management.md.
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const requireTool = createRequire(`${process.env.ORQO_SEO_TOOLS || '/tmp/orqo-seo-tools'}/package.json`);
const { chromium } = requireTool('playwright');
const { default: AxeBuilder } = await import(requireTool.resolve('@axe-core/playwright'));
const origin = process.env.ORQO_PREVIEW_URL || 'http://127.0.0.1:4321';
const output = new URL('../docs/seo/evidence/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext();
const requests = [];
// Keep this test from sending telemetry, chat sessions or real form submissions.
await context.route('**/*', route => {
  const url = new URL(route.request().url());
  if (url.origin !== origin) { requests.push(url.href); return route.abort(); }
  if (url.pathname === '/api/currency') return route.fulfill({ json: { currency: 'USD' } });
  if (url.pathname === '/api/telegram') return route.fulfill({ json: { ok: true } });
  return route.continue();
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', err => errors.push(err.message));
const paths = ['/', '/ar', '/pricing', '/ar/pricing', '/features', '/ar/features', '/features/omnichannel-inbox', '/ar/features/omnichannel-inbox', '/solutions/ecommerce', '/ar/solutions/clinics', '/compare/respond-io', '/ar/compare/manychat', '/alternatives/respond-io', '/ar/alternatives/respond-io', '/blog/automate-whatsapp-customer-support', '/ar/blog/clinic-patient-communication', '/contact', '/ar/contact'];
const results = [];
const sitemap = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
const httpRoutes = [];
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(match[1]).pathname;
  const response = await context.request.get(origin + path);
  assert.equal(response.status(), 200, path);
  httpRoutes.push(path);
}
assert.equal((await context.request.get(origin + '/seo-check-missing-route')).status(), 404);
try {
  for (const path of paths) {
    const status = (await page.goto(origin + path)).status();
    assert.equal(status, 200, path);
    await page.waitForLoadState('networkidle');
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.push({ path, status, accessibility: axe.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, targets: v.nodes.map(n => n.target) })) });
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(overflow <= 1, `${path} overflows by ${overflow}px at ${width}`);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + '/ar/features/omnichannel-inbox');
  await page.locator('.menu-btn').click();
  assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'), 'false');
  await page.locator('footer a.lang').click();
  assert.equal(new URL(page.url()).pathname, '/features/omnichannel-inbox');
  assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');

  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());
  requests.length = 0;
  await page.goto(origin + '/compare/respond-io');
  await page.waitForLoadState('networkidle');
  assert.equal(requests.filter(url => /googletagmanager|clarity|posthog/.test(url)).length, 0, 'Analytics loaded before consent');
  await page.locator('[data-consent="denied"]').click();
  await page.reload();
  assert.equal(await page.locator('#analytics-choice').isVisible(), false);
  assert.equal(requests.filter(url => /googletagmanager|clarity|posthog/.test(url)).length, 0, 'Analytics loaded after decline');
  await page.locator('[data-privacy-settings]').click();
  await page.locator('[data-consent="granted"]').click();
  await page.waitForTimeout(100);
  assert.equal(requests.filter(url => /googletagmanager/.test(url)).length, 1, 'Expected one GA script request');
  await page.evaluate(() => document.addEventListener('click', event => event.preventDefault(), { capture: true, once: true }));
  const start = await page.evaluate(() => window.dataLayer.length);
  await page.locator('main a[href="https://app.orqo.site/register"]').first().dispatchEvent('click', { bubbles: true, cancelable: true });
  const conversion = await page.evaluate(start => window.dataLayer.slice(start).map(args => Array.from(args)), start);
  assert.equal(conversion.filter(args => args[1] === 'signup_click').length, 1);
  assert.equal(conversion.filter(args => args[1] === 'comparison_signup_click').length, 1);
  await page.goto(origin + '/contact');
  await page.locator('#cf-name').fill('SEO test');
  await page.locator('#cf-email').fill('seo-test@example.test');
  await page.locator('#cf-msg').fill('Synthetic local test only.');
  await page.locator('button[type="submit"]').click();
  await page.waitForFunction(() => window.dataLayer.some(args => args[1] === 'contact_form_submit'));
  const formEvents = await page.evaluate(() => window.dataLayer.filter(args => args[1] === 'contact_form_submit').map(args => Array.from(args)));
  assert.equal(formEvents.length, 1);
  assert.ok(!JSON.stringify(formEvents).includes('example.test'));
  await page.locator('[data-privacy-settings]').click();
  await page.locator('[data-consent="denied"]').click();
  await page.waitForLoadState('networkidle');
  assert.equal(await page.evaluate(() => window.ORQOConsent.granted()), false);

  for (const [path, name] of [['/', 'home'], ['/ar', 'home-ar'], ['/features/omnichannel-inbox', 'feature'], ['/ar/features/omnichannel-inbox', 'feature-ar'], ['/compare/respond-io', 'comparison'], ['/ar/blog/clinic-patient-communication', 'article-ar']]) {
    await page.goto(origin + path);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: new URL(`${name}-mobile.png`, output).pathname, fullPage: true });
    await page.screenshot({ path: new URL(`${name}-mobile-top.png`, output).pathname });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: new URL(`${name}-desktop.png`, output).pathname, fullPage: true });
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  const violations = results.flatMap(r => r.accessibility.map(v => ({ path: r.path, ...v })));
  await writeFile(new URL('browser-checks.json', output), JSON.stringify({ httpRoutes, missingRouteStatus: 404, results, widths: [320, 768, 1024, 1440], consent: 'passed', conversions: 'passed', contactSubmission: 'intercepted locally; passed', runtimeErrors: errors }, null, 2) + '\n');
  assert.equal(violations.length, 0, JSON.stringify(violations, null, 2));
  console.log(`Passed ${paths.length} routes × 4 widths, WCAG A/AA checks, consent, conversions and local form stub.`);
} finally { await browser.close(); }
