import { auth } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';


export const load = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

    console.log('Session:', session);
	return session;
};
