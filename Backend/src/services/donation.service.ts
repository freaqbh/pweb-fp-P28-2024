import { PaymentMethod } from '../models/donation.model';
import Donation from '../models/donation.model';
import { Types } from 'mongoose';

export const donationService = {
    // Fungsi untuk menambahkan donation
    async addDonation(paymentMethod: PaymentMethod, amount: number) {
        try {
            // Membuat objek donation baru
            const donation = new Donation({
                payment_method: paymentMethod,
                amount: amount,
            });

            // Menyimpan donation ke dalam database
            await donation.save();

            return donation;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Error adding donation: ' + error.message);
            } else {
                throw new Error('Error adding donation');
            }
        }
    },

    async getDonationById(id: string) {
        try {
            return await Donation.findById(id);
        } catch (error) {
            throw new Error(`Failed to fetch donation`);
        }
    }
};