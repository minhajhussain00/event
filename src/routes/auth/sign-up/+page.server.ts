import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const res = await axios.post(`${event.url.origin}/api/signup`, form.data);

			if (res.data.success) {
				return message(form, res.data.message);
			} else {
				return setError(form, res.data.error || 'Signup failed');
			}
		} catch (err: any) {
			console.error('Signup request failed:', err);
			return setError(form, 'Unexpected error during signup');
		}
	}
};

