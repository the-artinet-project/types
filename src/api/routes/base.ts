/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { BaseSchema } from "../../base.js";

export const APIRequestSchema = BaseSchema.partial({
  id: true,
}).extend({
  requestId: z.string().optional().describe("The request ID"),
  timestamp: z.string().optional().describe("The timestamp"),
});
export type APIRequest = z.output<typeof APIRequestSchema>;

export const APIResponseSchema = BaseSchema.partial({
  id: true,
}).extend({
  requestId: z.string().optional().describe("The request ID"),
  timestamp: z.iso
    .datetime({ offset: true })
    .optional()
    .describe("The timestamp"),
  success: z
    .boolean()
    .optional()
    .describe("Whether the request was successful"),
  error: z.unknown().optional().describe("The error"),
});
export type APIResponse = z.output<typeof APIResponseSchema>;
