import { z } from 'zod';

export const formSchema = z.object({
    isAttending: z.boolean(),
    guestCount: z.number().min(1).default(1),
    message: z.string().max(500).optional(),
})

