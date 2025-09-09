import type { PageServerLoad, Actions } from './$types';
import { fail, error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import axios from 'axios';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params }) => {
  const { token } = params;


  let event;
  try {
    const res = await axios.post('http://localhost:5173/api/event/getEventByToken', { token });
    event = res.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      throw error(404, 'Event not found');
    }
    throw error(500, 'Failed to fetch event');
  }

  const form = await superValidate(zod(formSchema));

  return {
    form,
    event
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, zod(formSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { token } = params;

    try {
      const res = await axios.post(`http://localhost:5173/api/rsvp/update-rsvp`, {
        rsvpId: token,
        isAttending: form.data.isAttending,
        guestCount: form.data.guestCount,
        message: form.data.message
      });

      if (res.status !== 200) {
        return fail(500, { form, error: 'Failed to update RSVP. Please try again later.' });
      }
    } catch (err) {
      return fail(500, { form, error: 'Server error while updating RSVP.' });
    }

    return { form };
  }
};
