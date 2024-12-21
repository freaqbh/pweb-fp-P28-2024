import express from 'express';
import { donationController } from '../controllers/donation.controller';

const router = express.Router();

// Route untuk menambahkan donation
router.post('/donations', donationController.addDonation);
router.get('/donations/:id', donationController.getDonationById);

export default router;