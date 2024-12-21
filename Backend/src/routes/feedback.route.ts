import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const router = Router();

router.post("/feeds", FeedbackController.postFeedback);

export default router;