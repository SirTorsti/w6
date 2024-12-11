import mongoose, {Document, Schema} from 'mongoose'
import Image, {IImage} from '../models/Image'

interface IOffer extends Document{
    title: string
    description: string
    price: number
    imageId?: IImage | null
}

let offerSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageId: {type: Schema.Types.ObjectId, ref: 'Image'}
})

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>("Offer", offerSchema)

export {Offer, IOffer}