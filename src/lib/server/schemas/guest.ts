import mongoose, { Schema, Document, Model } from 'mongoose'

interface Iguest {
  name: string
  email: string
  eventId?: string,
  isAttending: boolean,
  RSVP_Token?: string,
  guestCount: number,
  rsvpStatus: 'pending' | 'accepted' | 'declined';
  message?: string;


}


interface IguestDocument extends Iguest, Document { }

const guestSchema: Schema<IguestDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  isAttending: { type: Boolean, default: false },
  RSVP_Token: { type: String },
  rsvpStatus: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  guestCount: { type: Number, default: 1 },
  message: { type: String },

})

const Guest: Model<IguestDocument> = mongoose.models.Guest || mongoose.model<IguestDocument>('Guest', guestSchema)

export default Guest
export type { Iguest, IguestDocument }
