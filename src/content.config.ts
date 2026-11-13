import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    scope: z.string(),
    updated: z.coerce.date(),
    /** true = not yet reviewed by a lawyer; shows a draft notice in review mode */
    draft: z.boolean().default(false),
    summary: z.array(z.string()).default([]),
  }),
});

// Astro content collections validate editorial data at build time.
// https://docs.astro.build/en/guides/content-collections/
const marketing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/marketing', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    lang: z.enum(['en', 'ar']),
    kind: z.enum(['features', 'solutions', 'compare', 'alternatives', 'blog']),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(15).max(85),
    description: z.string().min(50).max(230),
    heading: z.string(),
    intro: z.string(),
    draft: z.boolean().default(false),
    published: z.iso.date().optional(),
    updated: z.iso.date().optional(),
    reviewed: z.iso.date().optional(),
    author: z.string().default('ORQO'),
    screenshot: z.enum(['inbox']).optional(),
    screenshotAlt: z.string().optional(),
    related: z.array(z.string().regex(/^\/(features|solutions|compare|alternatives|blog)\//)).min(2),
    sources: z.array(z.object({ label: z.string(), url: z.url({ protocol: /^https$/ }) })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(2),
  }).superRefine((data, ctx) => {
    if (data.kind === 'blog' && (!data.published || !data.updated)) ctx.addIssue({ code: 'custom', message: 'Blog articles require publication and modification dates.' });
    if (['compare', 'alternatives'].includes(data.kind) && (!data.reviewed || !data.sources.length)) ctx.addIssue({ code: 'custom', message: 'Comparisons require official sources and a review date.' });
    if (data.screenshot && !data.screenshotAlt) ctx.addIssue({ code: 'custom', message: 'Screenshots require localized alt text.' });
  }),
});

export const collections = { legal, marketing };
