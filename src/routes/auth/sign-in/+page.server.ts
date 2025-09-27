import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
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
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}


		const res = await axios.post(`${event.url.origin}/api/signin`, {
			email: form.data.email,
			password: form.data.password
		});

		if (res.data.success) {
			throw redirect(302, '/');
		} else {
			return setError(form, res.data.error || 'Login failed');
		}
	}
};
