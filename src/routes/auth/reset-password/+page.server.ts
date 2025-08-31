import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');
	
	if (!token) {
		throw redirect(302, '/auth/forgot-password');
	}

	return {
		form: await superValidate(zod(formSchema)),
		token
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

			await auth.api.resetPassword({
				body: {
					token: form.data.token,
					newPassword: form.data.password
				}
			});
			
			
			throw redirect(302, '/auth/sign-in?reset=true');
		
	}
};
