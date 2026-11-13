// Laboratory metrics only. Install external tools as documented in docs/seo/content-management.md.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const requireTool = createRequire(`${process.env.ORQO_SEO_TOOLS || '/tmp/orqo-seo-tools'}/package.json`);
const { default: lighthouse } = await import(requireTool.resolve('lighthouse'));
const { launch } = await import(requireTool.resolve('chrome-launcher'));
const origin = process.env.ORQO_PREVIEW_URL || 'http://127.0.0.1:4321';
const baseline = process.env.ORQO_BASELINE_URL;
const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] });
const summary = [];
const targets = [...(baseline ? [['baseline-home', baseline + '/']] : []), ['current-home', origin + '/'], ['current-ar', origin + '/ar'], ['current-comparison', origin + '/compare/respond-io']];
try {
  for (const [name, url] of targets) {
    for (let sample = 1; sample <= 3; sample++) {
      const run = await lighthouse(url, {
        port: chrome.port, output: 'json', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        blockedUrlPatterns: ['https://app.orqo.site/*', 'https://www.googletagmanager.com/*', 'https://www.clarity.ms/*', 'https://us.i.posthog.com/*'],
        formFactor: 'mobile', logLevel: 'error',
      });
      const r = run.lhr;
      const audits = {};
      for (const id of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'unused-css-rules', 'errors-in-console']) {
        if (r.audits[id]) audits[id] = { value: r.audits[id].numericValue, display: r.audits[id].displayValue, score: r.audits[id].score, details: r.audits[id].details };
      }
      summary.push({ name, sample, url, lighthouseVersion: r.lighthouseVersion, fetchTime: r.fetchTime, scores: Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, v.score])), audits, warnings: r.runWarnings });
      console.log(name, sample, JSON.stringify(summary.at(-1).scores), 'LCP', audits['largest-contentful-paint']?.value, 'CLS', audits['cumulative-layout-shift']?.value);
    }
  }
  const output = new URL('../docs/seo/evidence/', import.meta.url);
  await mkdir(output, { recursive: true });
  await writeFile(new URL('lighthouse.json', output), JSON.stringify(summary, null, 2) + '\n');
} finally { await chrome.kill(); }
