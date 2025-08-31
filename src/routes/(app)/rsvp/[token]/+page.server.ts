import { error } from '@sveltejs/kit';
import Event from '$lib/server/schemas/event'
export async function load({ params }) {
  const event = await Event.findOne({ _id: params.token });
  if (!event) throw error(404, 'Event not found');

  return { event };
}
