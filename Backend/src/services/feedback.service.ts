import FeedbackModel from "../models/feedback.model"; // Import the Feedback MongoDB model
import { Feedback } from "../models/feedback.model"; // Import the Feedback type for type checking

interface NewFeedback {
  name: string;
  is_anonymous: boolean;
  email: string;
  message: string;
}

export type { NewFeedback };

export const feedbackService = {
  async postFeedback(newFeedback: NewFeedback): Promise<Feedback> {
    try {
      const feedbackInstance = new FeedbackModel(newFeedback); 
      const savedFeedback = await feedbackInstance.save(); 
      return savedFeedback as Feedback; 
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to save feedback: ${error.message}`);
      } else {
        throw new Error('Failed to save feedback: Unknown error');
      }
    }
  },
};
