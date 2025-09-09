import { z } from 'zod';


export const formSchema = z.object({
  isAttending: z.boolean(),
  guestCount: z.number().int().min(0).default(0),
  message: z.string().max(500),
}).refine(
  (data) => data.isAttending ? data.guestCount >= 1 : data.guestCount === 0,
  {
    message: "Guest count must be at least 1 if attending, or 0 if not attending",
    path: ["guestCount"]
  }
);
