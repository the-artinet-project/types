import { z } from "zod/v4";
import { ReviewSchema } from "../../runtime/review.js";
import { APIRequestSchema, APIResponseSchema } from "../api.js";

/**
 * Schema for review request validation.
 */
export const CreateReviewRequestSchema = APIRequestSchema.extend({
  /** The registration being reviewed */
  registrationId: z.string(),
  /** The review data */
  review: ReviewSchema,
  /** User ID of the reviewer (required for reviews) */
  ownerId: z.string(),
  /** Optional operation options */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated ReviewRequest */
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;
export type ReviewRequest = CreateReviewRequest;
/**
 * Schema for review response validation.
 */
export const CreateReviewResponseSchema = APIResponseSchema.extend({
  /** The created/updated review data */
  review: ReviewSchema.optional(),
  /** Whether the operation succeeded */
  success: z.boolean(),
});

/** Type alias for validated ReviewResponse */
export type CreateReviewResponse = z.infer<typeof CreateReviewResponseSchema>;
export type ReviewResponse = CreateReviewResponse;
