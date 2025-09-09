import type { RequestHandler } from './$types';
import Rsvp from '$lib/server/schemas/rsvp';
import { connectToDB } from '$lib/server/db/connect';

export const POST: RequestHandler = async (event) => {
    const { token, isAttending, guestCount, message } = await event.request.json();
	console.log("asdlfkjasld;kfjas;lkfajwle;kfj")
    await connectToDB();

    const rsvp = await Rsvp.findOne({RSVP_Token: token})

    if (!rsvp) {
        return new Response('RSVP not found', { status: 404 });
    }

    rsvp.isAttending = isAttending;
    rsvp.guestCount = guestCount;
    rsvp.message = message;
    rsvp.rsvpStatus = 'accepted';
    
    await rsvp.save();

    return new Response(JSON.stringify(rsvp), { status: 200 });
};
