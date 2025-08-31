import mongoose, { Schema, Document, Model } from 'mongoose'


interface Ievent {
    name: string
    date: Date,
    host: mongoose.Types.ObjectId,
    location: string
    description: string,
    type: string,
    isPublic: boolean,
    venue: string,
    guests?: mongoose.Types.ObjectId[],
    totalTickets: number,
    createdAt: Date
}


interface IeventDocument extends Ievent, Document {}

const eventSchema: Schema<IeventDocument> = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String },
    host: { type: Schema.Types.ObjectId, ref: 'User' , required: true },
    isPublic: { type: Boolean, default: true },
    venue: { type: String, required: true },
    guests: [{ type: Schema.Types.ObjectId, ref: 'Guest' }],
    totalTickets: { type: Number}, 
    createdAt: { type: Date, default: Date.now },
})

const Event: Model<IeventDocument> = mongoose.models.Event || mongoose.model<IeventDocument>('Event', eventSchema)

export default Event
export type { Ievent, IeventDocument }
 