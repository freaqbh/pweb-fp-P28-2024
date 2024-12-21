import { Request, Response } from "express";
import { feedbackService } from "../services/feedback.service";
import { NewFeedback } from "../services/feedback.service";

export class FeedbackController {
  /**
   * Handles posting feedback.
   */
  static async postFeedback(req: Request, res: Response): Promise<void> {
    try {
      const feedbackData: NewFeedback = req.body; // Extract feedback data from the request body

      // Validate required fields
      if (!feedbackData.message || feedbackData.message.trim() === "") {
        res.status(400).json({ message: "Message is required." });
        return;
      }

      const savedFeedback = await feedbackService.postFeedback(feedbackData);
      res.status(201).json({ message: "Feedback submitted successfully", data: savedFeedback });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit feedback", error: (error as Error).message });
    }
  }
}
