import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

type Inquiry = {
	id: string;
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
			name: z.string().trim().min(1, 'お名前を入力してください。').max(50),
			subject: z.string().trim().min(1, '件名を入力してください。').max(100),
			message: z.string().trim().min(1, 'お問い合わせ内容を入力してください。').max(1000),
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
