import mongoose, { Schema, Document, Model } from 'mongoose'

interface Irsvp {
    guestId?: string,
    isAttending: boolean,
    RSVP_Token?: string,
    guestCount: number,
    rsvpStatus: 'pending' | 'accepted' | 'declined';
    message?: string;
    eventId?: string;
}


interface IrsvpDocument extends Irsvp, Document { }

const rsvpSchema: Schema<IrsvpDocument> = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    isAttending: { type: Boolean, default: false },
    RSVP_Token: { type: String },
    rsvpStatus: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    },
    guestCount: { type: Number, default: 1 },
    message: { type: String },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
})

const Rsvp: Model<IrsvpDocument> = mongoose.models.Rsvp || mongoose.model<IrsvpDocument>('Rsvp', rsvpSchema)

export default Rsvp
export type { Irsvp, IrsvpDocument }
