import { auth } from '$lib/server/auth';
import { connectToDB } from '$lib/server/db/connect';
import { sendInviteEmail } from '$lib/server/email/emails';
import Event from '$lib/server/schemas/event';
import Guest from '$lib/server/schemas/guest';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async ({ params, url, request }) => {
    await connectToDB();
    const { guestEmail, name ,eventId} = await request.json();

    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: request.headers,
    });

    console.log(eventId)

    if (!session) return new Response("Unauthorized", { status: 401 });

    if (!guestEmail) {
        return new Response("Guest email is required", { status: 400 });
    }

    const Guest_RVSP_Token = Math.random().toString(36).substring(2, 15);

    const newGuest = await Guest.create({
        name,
        email: guestEmail,
        rsvpToken: Guest_RVSP_Token,
        eventId,
    })
    const event = await Event.findById(eventId);

    if (!event) {
            return new Response("Event not found", { status: 404 });
        }
    await sendInviteEmail(guestEmail, event.name,Guest_RVSP_Token);
    return new Response(JSON.stringify(newGuest), { status: 201 });
};
