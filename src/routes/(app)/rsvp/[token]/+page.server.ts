import type {PageServerLoad,Actions} from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { connectToDB } from '$lib/server/db/connect';
import { formSchema } from './schema';
import axios from 'axios';


export const load: PageServerLoad = async ({ params }) => {
 const {token} = params;
    const res = await axios.post('http://localhost:5173/api/event/getEventByToken', {token});
    if(res.status === 404){
        return {
            status: 404,
            error: new Error('Event not found')
            
        };
    }
  return {
    event:res.data,
    form: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  default: async ({request, params}) => {
    	const form = await superValidate(request, zod(formSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const { token } = params;
    console.log(token, form)

    const res = await axios.post(`http://localhost:5173/api/rsvp/update-rsvp`, {
      rsvpId: token,
      isAttending: form.data.isAttending,
      guestCount: form.data.guestCount,
      message: form.data.message
    });
    console.log(res)
    if (res.status !== 200) {
      return fail(500, { form, error: 'Failed to update RSVP. Please try again later.' });
    }
    
    return {form};
  }
};
