import mongoose, { Schema, Document, Model } from 'mongoose'

interface Iguest {
  name: string,
  email: string,
  eventId?: string,
  rsvpId?: string,
}


interface IguestDocument extends Iguest, Document { }

const guestSchema: Schema<IguestDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  rsvpId: { type: Schema.Types.ObjectId, ref: 'Rsvp' },
})

const Guest: Model<IguestDocument> = mongoose.models.Guest || mongoose.model<IguestDocument>('Guest', guestSchema)

export default Guest
export type { Iguest, IguestDocument }
