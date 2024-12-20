import mongoose, { Schema, Document } from 'mongoose';
import { FavoriteCrowdfund } from './favorite.model';

export enum CrowdfundStatus {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE'
}

export interface Crowdfund extends Document {
    name: string;
    target: string;
    current_donation: number;
    status: CrowdfundStatus;
    favorite_crowdfund: FavoriteCrowdfund;
    created_at: Date;
}

const CrowdfundSchema: Schema = new Schema({
    name: { type: String, required: true },
    target: { type: String, required: true },
    current_donation: { type: Number, default: 0 },
    status: { type: String, enum: CrowdfundStatus, required: true },
    favorite_crowdfund: { type: Schema.Types.ObjectId, ref: 'FavoriteCrowdfund' },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<Crowdfund>('Crowdfund', CrowdfundSchema);