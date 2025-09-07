import type { RequestHandler } from './$types';
import Rsvp from '$lib/server/schemas/rsvp';
import Event from '$lib/server/schemas/event';
import { connectToDB } from '$lib/server/db/connect';
                                    
export const POST: RequestHandler = async ({request}) => {
    connectToDB()
    const {token}  = await request.json();
    const rsvp = await Rsvp.findOne({RSVP_Token:token}).populate('eventId');
    if(!rsvp){
        return new Response('Rsvp not found', {status: 404});
    }
    const event = rsvp.eventId;
    return new Response(JSON.stringify(event), {status: 200});
};