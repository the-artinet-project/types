/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { APIRequestSchema, APIResponseSchema } from "./base.js";

/**
 * Schema for find request validation.
 * Requires a URI identifier and optional configuration.
 */
export const FindRequestSchema = APIRequestSchema.extend({
  /** The URI of the entity to find (e.g., 'agent:123', 'registration:my-service') */
  //todo: use string array instead of string
  uri: z.string(),
  /** Optional configuration options for the find operation */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated FindRequest */
export type FindRequest = z.output<typeof FindRequestSchema>;

/**
 * Schema for find response validation.
 * Contains results map, success flag, and optional error.
 */
export const FindResponseSchema = APIResponseSchema.extend({
  /** Map of URI to found entity (empty if not found) */
  //todo: use union type instead of any
  results: z.record(z.string(), z.any()),
  /** Whether the find operation succeeded */
  success: z.boolean(),
  /** Optional metadata from the operation */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated FindResponse */
export type FindResponse = z.output<typeof FindResponseSchema>;
