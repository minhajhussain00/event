import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth.js';
import { APIError } from 'better-auth/api';
import { connectToDB } from '$lib/server/db/connect';

export const POST: RequestHandler = async ({ request }) => {
	try {
		await connectToDB();
		const { email, password, firstName, lastName } = await request.json();

		if (!email || !password || !firstName || !lastName) {
			return new Response(
				JSON.stringify({ success: false, error: 'Missing required fields' }),
				{ status: 400 }
			);
		}

		await auth.api.signUpEmail({
			body: {
				name: `${firstName} ${lastName}`,
				email,
				password,
				firstName,
				lastName
			}
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Account created. Please check your inbox for activation link.'
			}),
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof APIError) {
			return new Response(JSON.stringify({ success: false, error: error.message }), {
				status: 400
			});
		}

		console.error('Unexpected error:', error);
		return new Response(JSON.stringify({ success: false, error: 'Unexpected error' }), {
			status: 500
		});
	}
};

