import { Document, Schema, model, models } from "mongoose";

export interface IImage extends Document {
    title: string;
    transformationType: string;
    secureUrl: string;
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: string;
    aspectRatio?: string;
    color?: string;
    promt?: string;
    author: {
        _id: string;
        firstName: string;
        lastname: string;
    };
    createdAt?: Date;
    updateddAt?: Date;
}

const ImageShema = new Schema({
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicId: { type: String, required: true },
    secureUrl: { type: URL, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: URL },
    aspectRatio: { type: String },
    color: { type: String },
    promt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updateddAt: { type: Date, default: Date.now },
})

const Image = models?.Image || model('Image', ImageShema)

export default Image