import { z } from "zod/v4";

/**
 * Schema for review data.
 * Contains the rating and review content for an agent.
 */
export const ReviewSchema = z.object({
  /** The registration ID being reviewed */
  registrationId: z.string(),
  /** Rating from 0 to 5 stars */
  rating: z.number().min(0).max(5).default(0),
  /** Review text content */
  review: z.string(),
});

/** Type alias for validated Review */
export type Review = z.infer<typeof ReviewSchema>;
