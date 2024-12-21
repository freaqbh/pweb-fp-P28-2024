import { Request, Response, NextFunction } from 'express';
import { donationService } from '../services/donation.service';
import { PaymentMethod } from '../models/donation.model';

export const donationController = {
    // Endpoint untuk menambahkan donation
    async addDonation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { paymentMethod, amount } = req.body;

            // Validasi input
            if (!paymentMethod || !amount) {
                res.status(400).send({
                    status: 'error',
                    message: 'Payment method and amount are required',
                });
                return;
            }

            // Validasi jika payment method adalah salah satu dari enum yang valid
            if (!Object.values(PaymentMethod).includes(paymentMethod)) {
                res.status(400).send({
                    status: 'error',
                    message: 'Invalid payment method',
                });
                return;
            }

            // Menambahkan donation
            const donation = await donationService.addDonation(paymentMethod, amount);

            res.status(201).send({
                status: 'success',
                message: 'Donation added successfully',
                data: donation,
            });
        } catch (error) {
            next(error); // Delegasikan error ke error-handling middleware
        }
    },

    async getDonationById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).send({
                    status: 'error',
                    message: 'Donation ID is required',
                });
                return;
            }

            const donation = await donationService.getDonationById(id);

            if (!donation) {
                res.status(404).send({
                    status: 'error',
                    message: 'Donation not found',
                });
                return;
            }

            res.status(200).send({
                status: 'success',
                message: 'Donation fetched successfully',
                data: donation,
            });
        } catch (error) {
            next(error);
        }
    },
};
