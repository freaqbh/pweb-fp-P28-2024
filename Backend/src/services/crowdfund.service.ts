import Crowdfund from '../models/crowdfund.model';
import { FavoriteCrowdfund } from '../models/favorite.model';
import { CrowdfundStatus } from '../models/crowdfund.model';

export type NewCrowdfund = {
    name: string;
    target: string;
    current_donation: number;
    status: CrowdfundStatus;
    favorite_crowdfund: FavoriteCrowdfund;
    created_at: Date;
};

export type UpdateCrowdfund = Partial<NewCrowdfund>;

export const crowdfundService = {
    async getAllCrowdfunds() {
        return await Crowdfund.find();
    },

    async getCrowdfundById(id: string) {
        const crowdfund = await Crowdfund.findById(id);
        if (!crowdfund) {
            throw new Error('Crowdfund not found');
        }
        return crowdfund;
    },

    async createCrowdfund(newCrowdfund: NewCrowdfund) {
        const crowdfund = new Crowdfund(newCrowdfund);
        return await crowdfund.save();
    },

    async updateCrowdfund(id: string, updateData: UpdateCrowdfund) {
        const crowdfund = await Crowdfund.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!crowdfund) {
            throw new Error('Crowdfund not found');
        }
        return crowdfund;
    },

    async deleteCrowdfundById(id: string) {
        const crowdfund = await Crowdfund.findByIdAndDelete(id);
        if (!crowdfund) {
            throw new Error('Crowdfund not found');
        }
        return crowdfund;
    },
};
