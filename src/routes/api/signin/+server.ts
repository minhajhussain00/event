// src/routes/api/login/+server.ts
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';
import { connectToDB } from '$lib/server/db/connect';

export const POST: RequestHandler = async ({ request }) => {
	try {
		await connectToDB();
		const { email, password } = await request.json();

		await auth.api.signInEmail({
			body: {
				email,
				password,
				callbackURL: '/auth/verification-success'
			}
		});

		return new Response(JSON.stringify({
			success: true,
			message: 'Login successful'
		}), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		if (error instanceof APIError) {
			return new Response(JSON.stringify({
				success: false,
				error: error.message || 'Login failed'
			}), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		console.error('Unexpected error:', error);
		return new Response(JSON.stringify({
			success: false,
			error: 'Unexpected error'
		}), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
