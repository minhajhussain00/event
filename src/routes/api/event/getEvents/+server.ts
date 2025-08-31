import type { RequestHandler } from './$types';
import { APIError } from 'better-auth/api';
import { connectToDB } from '$lib/server/db/connect'
import { auth } from '$lib/server/auth';
import Event from '$lib/server/schemas/event';

export const GET: RequestHandler = async (req) => {
    connectToDB();
     const session = await auth.api.getSession({
            query: {
                disableCookieCache: true,
            }, 
            headers: req.request.headers, 
        })
    if (!session?.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    let events =  await Event.find();

    return new Response(JSON.stringify(events),{status:200});
};