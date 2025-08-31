import type { RequestHandler } from './$types';

import Stripe from "stripe";
import { auth } from "$lib/server/auth"; 
import { connectToDB } from "$lib/server/db/connect"; 
import mongoose from "mongoose";
import { PRIVATE_STRIPE_SECRET_KEY } from "$env/static/private";

const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY!);

export const POST: RequestHandler = async (req) => {
  const session = await auth.api.getSession({
    query: {
        disableCookieCache: true,
    }, 
    headers: req.request.headers, 
});
  if (!session) return new Response("Unauthorized",{ status: 401 });
    await connectToDB();
    console.log("adfas",session)

  if (!session?.user.stripeCustomerId) {
    return new Response("No Stripe customer ID found", { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: session.user.stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1RidZn2ZZENLEOlobeqkeucd", 
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  console.log(checkoutSession.url)
  return new Response(
    JSON.stringify({ url: checkoutSession.url }),
    { status: 200 }
  );
};
