import type { SuperValidated } from "sveltekit-superforms";
import type { z } from "zod";
import { formSchema } from "./schema";

type FormSchema = typeof formSchema;
export type RSVPForm = SuperValidated<z.infer<FormSchema>>;

export interface PageData {
  form: RSVPForm;
  event: {
    name: string;
    date: string;
    location: string;
    description: string;
    type: string;
    venue: string;
    isPublic: boolean;
    createdAt: string;
  };
}
