import type { RequestHandler } from './$types';
import { APIError } from 'better-auth/api';
import { connectToDB } from '$lib/server/db/connect'
import { auth } from '$lib/server/auth';
import Event from '$lib/server/schemas/event';

export const GET: RequestHandler = async (req) => {
    connectToDB();
    let events =  await Event.find();

    return new Response(JSON.stringify(events),{status:200});
};
