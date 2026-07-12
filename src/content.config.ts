import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/faq' }),
	schema: z.object({
		title: z.string(),
		category: z.enum(['アカウント', '講座', '学習履歴', '料金・支払い', '動画再生']),
		order: z.number(),
		keywords: z.array(z.string()),
		summary: z.string(),
	}),
});

export const collections = { faq };
