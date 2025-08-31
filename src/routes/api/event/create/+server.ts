import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';
import Event,{type Ievent} from "$lib/server/schemas/event"
import { connectToDB } from "$lib/server/db/connect"
import { json } from '@sveltejs/kit';


export const POST: RequestHandler = async (req) => {
    await connectToDB();

     const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        }, 
        headers: req.request.headers, 
    })
    const body = await req.request.json();

    if (!session) return new Response("Unauthorized", { status: 401 });

    const newEvent:Ievent = await Event.create({
        name: body.name,
        date: new Date(body.date),
        location: body.location,
        description: body.description,
        type: body.type,
        host: session.user.id, 
        isPublic: body.isPublic,
        venue: body.venue,
        totalTickets: body.totalTickets,
        guests: [],
        createdAt: new Date(),
    })

    return json(newEvent, { status: 201 })

};