import mongoose, { Schema, Document } from 'mongoose';

export interface FavoriteCrowdfund extends Document {
    user_id: mongoose.Types.ObjectId;
    crowdfund_id: mongoose.Types.ObjectId;
}

const FavoriteCrowdfundSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    crowdfund_id: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true }
});

export default mongoose.model<FavoriteCrowdfund>('FavoriteCrowdfund', FavoriteCrowdfundSchema);
