import { Request, Response, NextFunction } from 'express';
import favoriteCrowdfundService from '../services/favorite.service';

export const favoriteController = {
    async getAllFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const favorites = await favoriteCrowdfundService.getFavoritesByUser(req.params.user_id);
            res.status(200).send({
                status: 'success',
                message: 'Favorites fetched successfully',
                data: favorites,
            });
        } catch (error) {
            next(error);
        }
    },

    async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id, crowdfund_id } = req.body;

            if (!user_id || !crowdfund_id) {
                res.status(400).send({
                    status: 'error',
                    message: 'user_id and crowdfund_id are required',
                });
                return;
            }

            // Optional: Check for duplicate favorites
            const isExists = await favoriteCrowdfundService.isFavoriteExists(user_id, crowdfund_id);
            if (isExists) {
                res.status(400).send({
                    status: 'error',
                    message: 'Favorite already exists',
                });
                return;
            }

            const favorite = await favoriteCrowdfundService.addFavorite(user_id, crowdfund_id);
            res.status(201).send({
                status: 'success',
                message: 'Favorite added successfully',
                data: favorite,
            });
        } catch (error) {
            next(error);
        }
    },
};
