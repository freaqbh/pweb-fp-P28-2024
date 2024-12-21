import express from 'express';
import { crowdfundController } from '../controllers/crowdfund.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/crowdfunds', auth, crowdfundController.getAllCrowdfunds);
router.get('/crowdfunds/:id', auth, crowdfundController.getCrowdfundById);
router.post('/crowdfunds', auth, crowdfundController.addCrowdfund);
router.put('/crowdfunds/:id', auth, crowdfundController.updateCrowdfund);
router.delete('/crowdfunds/:id', auth, crowdfundController.deleteCrowdfundById);

export default router;