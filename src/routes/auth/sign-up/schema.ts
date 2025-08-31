import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email(),
	password: z.string().min(6),
	passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
	message: "Passwords don't match",
	path: ["passwordConfirm"]
});

