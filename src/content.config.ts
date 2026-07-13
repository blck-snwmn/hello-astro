import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/faq' }),
	schema: z.object({
		locale: z.enum(['en', 'ja']),
		title: z.string(),
		category: z.string(),
		order: z.number(),
		keywords: z.array(z.string()),
		summary: z.string(),
	}),
});

export const collections = { faq };
