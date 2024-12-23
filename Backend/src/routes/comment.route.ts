import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';

const router = Router();

router.post('/', CommentController.addComment);

export default router;