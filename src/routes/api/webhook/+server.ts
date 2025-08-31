import type { RequestHandler } from './$types';

import { PRIVATE_STRIPE_SECRET_KEY, PRIVATE_STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import Stripe from "stripe";

const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY!);

export const POST: RequestHandler = async ({ request }) => {
  const sig = request.headers.get("stripe-signature")!;
  const rawBody = await request.text();
  
  let event;
  try { 
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
    PRIVATE_STRIPE_WEBHOOK_SECRET!
    );
  } catch (err :any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    console.log(`✅ Payment received from customer: ${customerId}`);
  }

  return new Response("ok", { status: 200 });
};
