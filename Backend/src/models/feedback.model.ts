import mongoose, { Schema, Document } from 'mongoose';

export interface Feedback extends Document {
    name: string;
    is_anonymous: boolean;
    email: string;
    message: string;
}

const FeedbackSchema: Schema = new Schema({
    name: { type: String, required: false },
    is_anonymous: { type: Boolean, required: true, default: false },
    email: { type: String, required: false },
    message: { type: String, required: true }
});

export default mongoose.model<Feedback>('Feedback', FeedbackSchema);