import express from 'express';
import { favoriteController } from '../controllers/favorite.controller';

const router = express.Router();

router.post('/favorites', favoriteController.addFavorite);
router.get('/favorites/:user_id', favoriteController.getAllFavorites);
router.delete('/favorites/:user_id/:crowdfund_id', favoriteController.deleteFavorite);

export default router;