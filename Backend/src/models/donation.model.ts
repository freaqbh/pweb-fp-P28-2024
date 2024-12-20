import mongoose, { Schema, Document } from 'mongoose';

export enum PaymentMethod {
    QRIS = 'QRIS',
    BANK_TRANSFER = 'BANK_TRANSFER'
}

export interface Donation extends Document {
    payment_method: PaymentMethod;
    amount: number;
}

const DonationSchema: Schema = new Schema({
    payment_method: { type: String, enum: PaymentMethod, required: true },
    amount: { type: Number, required: true }
});

export default mongoose.model<Donation>('Donation', DonationSchema);
