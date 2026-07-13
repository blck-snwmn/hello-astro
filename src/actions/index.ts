import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

type Inquiry = {
	id: string;
	locale: 'en' | 'ja';
	name: string;
	subject: string;
	message: string;
	createdAt: Date;
};

const inquiries: Inquiry[] = [];

export const server = {
	sendInquiry: defineAction({
		accept: 'form',
		input: z.object({
			locale: z.enum(['en', 'ja']),
			name: z.string().trim().min(1).max(50),
			subject: z.string().trim().min(1).max(100),
			message: z.string().trim().min(1).max(1000),
		}),
		handler: async (input) => {
			const inquiry: Inquiry = {
				id: crypto.randomUUID(),
				...input,
				createdAt: new Date(),
			};

			inquiries.push(inquiry);
			console.info('Inquiry received', inquiry);

			return inquiry;
		},
	}),
};
