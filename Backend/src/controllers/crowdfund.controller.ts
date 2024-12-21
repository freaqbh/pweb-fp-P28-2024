import { Request, Response, NextFunction } from 'express';
import { crowdfundService } from '../services/crowdfund.service';
import { NewCrowdfund, UpdateCrowdfund } from '../services/crowdfund.service';

export const crowdfundController = {
    async getAllCrowdfunds(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const crowdfunds = await crowdfundService.getAllCrowdfunds();
            res.status(200).send({
                status: 'success',
                message: 'Crowdfunds fetched successfully',
                data: crowdfunds,
            });
        } catch (error) {
            next(error); // Delegate error to error-handling middleware
        }
    },

    async getCrowdfundById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const crowdfund = await crowdfundService.getCrowdfundById(req.params.id);
            res.status(200).send({
                status: 'success',
                message: 'Crowdfund fetched successfully',
                data: crowdfund,
            });
        } catch (error) {
            next(error);
        }
    },

    async addCrowdfund(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const crowdfund = await crowdfundService.createCrowdfund(req.body as NewCrowdfund);
            res.status(201).send({
                status: 'success',
                message: 'Crowdfund added successfully',
                data: crowdfund,
            });
        } catch (error) {
            next(error);
        }
    },

    async updateCrowdfund(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const crowdfund = await crowdfundService.updateCrowdfund(req.params.id, req.body as UpdateCrowdfund);
            res.status(200).send({
                status: 'success',
                message: 'Crowdfund updated successfully',
                data: crowdfund,
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCrowdfundById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const crowdfund = await crowdfundService.deleteCrowdfundById(req.params.id);
            res.status(200).send({
                status: 'success',
                message: 'Crowdfund deleted successfully',
                data: crowdfund,
            });
        } catch (error) {
            next(error);
        }
    },
};
