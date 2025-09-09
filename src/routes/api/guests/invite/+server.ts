import { auth } from '$lib/server/auth';
import { connectToDB } from '$lib/server/db/connect';
import { sendInviteEmail } from '$lib/server/email/emails';
import Event from '$lib/server/schemas/event';
import Guest, { type Iguest } from '$lib/server/schemas/guest';
import Rsvp, { type Irsvp } from '$lib/server/schemas/rsvp';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async ({ params, url, request }) => {
    await connectToDB();
    const { guestEmail, name ,eventId} = await request.json();
    console.log("request body:", { guestEmail, name ,eventId});
    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: request.headers,
    });

    if (!session) return new Response("Unauthorized", { status: 401 });

    if (!guestEmail) {
        return new Response("Guest email is required", { status: 400 });
    }

    const existingGuest = await Guest.findOne({ email: guestEmail , eventId });
    if(existingGuest){
        return new Response("Guest with this email already invited", { status: 400 });
    }

    const Guest_RVSP_Token = Math.random().toString(36).substring(2, 15);

      const guestRsvp = await Rsvp.create({
        RSVP_Token: Guest_RVSP_Token,
        eventId,
        
     });
    const newGuest = await Guest.create({
        name,
        email: guestEmail,
        eventId,
        rsvpId: guestRsvp._id
    });
    console.log(newGuest._id)
    guestRsvp.guestId = String(newGuest._id);
    await guestRsvp.save();

    const event = await Event.findById(eventId);

    if (!event) {
            return new Response("Event not found", { status: 404 });
        }
    await sendInviteEmail(guestEmail, event.name,Guest_RVSP_Token);
    return new Response(JSON.stringify({ newGuest, guestRsvp }), { status: 201 });
};
