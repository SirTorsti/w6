import mongoose, {Document, Schema} from 'mongoose'

interface IImage extends Document {
    filename: string
    path: string
}

let imageSchema: Schema = new Schema ({
    filename: {type: String, required: true},
    path: {type: String, required: true}
})

const Image = mongoose.model<IImage>('Image', imageSchema)

export default Image