import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';

export class CommentController {
    // Controller untuk menambahkan komentar baru
    static async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { message } = req.body;

            if (!message) {
                res.status(400).send({
                    status: 'error',
                    message: 'Message is required',
                });
                return;
            }

            const newComment = await CommentService.addComment(message);

            res.status(201).send({
                status: 'success',
                message: 'Comment added successfully',
                data: newComment,
            });
        } catch (error) {
            next(error);
        }
    }
}