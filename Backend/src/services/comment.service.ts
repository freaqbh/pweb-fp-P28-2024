import CommentModel, { Comment } from '../models/comment.model';

export class CommentService {
    // Service untuk menambahkan komentar baru
    static async addComment(message: string): Promise<Comment> {
        try {
            const comment = new CommentModel({ message });
            return await comment.save();
        } catch (error) {
            throw new Error('Error adding comment');
        }
    }
}