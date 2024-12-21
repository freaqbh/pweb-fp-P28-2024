import FavoriteCrowdfund, { FavoriteCrowdfund as FavoriteCrowdfundType } from '../models/favorite.model';
import { Types } from 'mongoose';

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

    async deleteFavorite(user_id: string, crowdfund_id: string) {
        try {
            // Mengkonversi user_id dan crowdfund_id ke dalam ObjectId (karena mereka adalah ObjectId di MongoDB)
            const userObjectId = new Types.ObjectId(user_id);
            const crowdfundObjectId = new Types.ObjectId(crowdfund_id);

            // Mencari dan menghapus entry yang sesuai di model FavoriteCrowdfund
            const result = await FavoriteCrowdfund.findOneAndDelete({
                user_id: userObjectId,
                crowdfund_id: crowdfundObjectId,
            });

            // Mengecek apakah favorite ditemukan dan dihapus
            if (!result) {
                throw new Error('Favorite not found');
            }

            return result; // Kembalikan hasil jika berhasil dihapus
        } catch (error) {
            throw new Error('Error deleting favorite');
        }
    }
}

export default new FavoriteCrowdfundService();