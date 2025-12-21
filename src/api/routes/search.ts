/**
 * @fileoverview Type definitions for the Search module.
 *
 * Defines schemas and types for entity search operations:
 * - Pagination cursor structure
 * - Search request/response schemas
 * - Pipeline context and interceptor types
 *
 * @module search/types/definitions
 */

import { z } from "zod/v4";
import { APIRequestSchema, APIResponseSchema } from "../api.js";

/**
 * Schema for pagination cursor.
 * Enables efficient pagination through large result sets.
 */
export const CursorSchema = z.object({
  /** Starting index for the current page */
  startIndex: z.number().default(0),
  /** Number of results per page */
  batchSize: z.number().default(10),
});

/** Type alias for pagination cursor */
export type SearchCursor = z.infer<typeof CursorSchema>;

/**
 * Schema for search request validation.
 */
export const SearchRequestSchema = APIRequestSchema.extend({
  /** Array of search query strings */
  queries: z.array(z.string()),
  /** Maximum number of results to return */
  size: z.number().default(10),
  /** Optional pagination cursor */
  cursor: CursorSchema.optional(),
  /** Optional operation options */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated SearchRequest */
export type SearchRequest = z.infer<typeof SearchRequestSchema>;

/**
 * Schema for search response validation.
 */
export const SearchResponseSchema = APIResponseSchema.extend({
  /** Map of entity IDs to result data */
  results: z.record(z.string(), z.any()),
  /** Number of results returned */
  size: z.number(),
  /** Cursor for fetching next page */
  cursor: CursorSchema,
  /** Optional response metadata */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated SearchResponse */
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
