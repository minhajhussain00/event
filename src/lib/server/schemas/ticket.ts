import mongoose, { Schema, Document, Model } from 'mongoose'


interface Iticket {
    event: mongoose.Types.ObjectId,
    buyer: mongoose.Types.ObjectId,
    price: number,
    createdAt: Date
}

interface IticketDocument extends Iticket, Document {}

const ticketSchema: Schema<IticketDocument> = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },  
  price: { type: Number },                                           
  createdAt: { type: Date, default: Date.now },
});


const Ticket: Model<IticketDocument> = mongoose.models.Ticket || mongoose.model<IticketDocument>('Ticket', ticketSchema)

export default Ticket
export type { Iticket, IticketDocument }
