import { auth } from '$lib/server/auth';
import { toSvelteKitHandler } from 'better-auth/svelte-kit';

const baseHandler = toSvelteKitHandler(auth);

const handler = async (event: any) => {
	console.log(`[Auth] ${event.request.method} ${event.url.pathname}`);
	return baseHandler(event);
};

export { handler as GET, handler as POST };