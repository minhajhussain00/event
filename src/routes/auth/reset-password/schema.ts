import { z } from 'zod';

export const formSchema = z.object({
	password: z.string().min(8, 'Password must be at least 8 characters'),
	confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
	token: z.string().min(1, 'Invalid reset token')
}).refine(data => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"]
});

export type FormSchema = typeof formSchema;