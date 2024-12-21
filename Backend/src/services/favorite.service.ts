import FavoriteCrowdfund, { FavoriteCrowdfund as FavoriteCrowdfundType } from '../models/favorite.model';

export class FavoriteCrowdfundService {
    // Menambahkan data favorite
    async addFavorite(userId: string, crowdfundId: string): Promise<FavoriteCrowdfundType> {
        const favorite = new FavoriteCrowdfund({ user_id: userId, crowdfund_id: crowdfundId });
        return await favorite.save();
    }

    // Mendapatkan data favorite berdasarkan user_id
    async getFavoritesByUser(userId: string): Promise<FavoriteCrowdfundType[]> {
        return await FavoriteCrowdfund.find({ user_id: userId }).populate('crowdfund_id');
    }

    // Mengecek apakah favorite sudah ada (opsional untuk mencegah duplikasi)
    async isFavoriteExists(userId: string, crowdfundId: string): Promise<boolean> {
        const existingFavorite = await FavoriteCrowdfund.findOne({ user_id: userId, crowdfund_id: crowdfundId });
        return !!existingFavorite;
    }
}

export default new FavoriteCrowdfundService();