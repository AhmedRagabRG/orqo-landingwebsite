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

export const collections = { legal };
