import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import dotenv from 'dotenv';
import exp from 'constants';

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            res.status(401).send({ error: 'Authorization header is missing' });
            return; // Berhenti di sini jika tidak ada header
        }

        const token = authHeader.replace('Bearer ', '');
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            res.status(401).send({ error: 'Invalid token or user not found' });
            return; // Berhenti di sini jika user tidak ditemukan
        }

        // Tambahkan data user dan token ke objek request
        (req as any).token = token;
        (req as any).user = user;
        next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export const admin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = (req as any).user;
        if (!user.admin) {
            res.status(403).send({ error: 'You are not authorized to perform this action' });
            return; // Berhenti di sini jika user bukan admin
        }
        next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}
