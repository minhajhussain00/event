import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { svelteCookies } from "./auth-svelte-cookies";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"
import { PRIVATE_MONGODB_URI, PRIVATE_STRIPE_SECRET_KEY, PRIVATE_STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import { dbName } from "./constant";
import { sendVerificationEmail, sendResetPasswordEmail } from "./email/emails";

const stripeClient = new Stripe(PRIVATE_STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
})

const client = new MongoClient(`${PRIVATE_MONGODB_URI}/${dbName}`);
const db = client.db();     

console.log("Connected to MongoDB");
export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }: any, request: any) => {
            await sendResetPasswordEmail(user.email, url, token);
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendVerificationEmail(user.email, url, token);
        }
    },
    plugins: [
        svelteCookies(),
        stripe({
            stripeClient,
            stripeWebhookSecret: PRIVATE_STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
        })
    ],
    user: {
        additionalFields: {
            firstName: {
                type: "string",
                required: true,
            },
            lastName: {
                type: "string",
            },
        }
    }
});
