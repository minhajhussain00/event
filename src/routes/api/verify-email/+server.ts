import type { RequestHandler } from './$types';

import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const GET:RequestHandler = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Missing verification token.', { status: 400 });
  }

  try {
    await auth.api.verifyEmail({
    query: {
        token,
        callbackURL: '/auth/verification-success'
    }
})
	console.log("redirecting")
    throw redirect(302, "/auth/verification-success");
  } catch (err) {
    console.error('Email verification failed:', err);
    return new Response('Invalid or expired verification link.', { status: 400 });
  }
};  