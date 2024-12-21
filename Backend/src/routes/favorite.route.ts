import express from 'express';
import { favoriteController } from '../controllers/favorite.controller';

const router = express.Router();

router.post('/favorites', favoriteController.addFavorite);
router.get('/favorites/:user_id', favoriteController.getAllFavorites);

export default router;