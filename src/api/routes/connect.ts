/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { SessionSchema } from "./session.js";
import {
  ConnectOptionsSchema,
  ConnectResponseOptionsSchema,
} from "../options/index.js";
import { APIRequestSchema, APIResponseSchema } from "../api.js";

export const ConnectRequestSchema = APIRequestSchema.extend({
  identifier: z.string(),
  session: SessionSchema,
  preferredEndpoint: z.string(),
  options: ConnectOptionsSchema.optional(),
});
export type ConnectRequest = z.infer<typeof ConnectRequestSchema>;

export const ConnectResponseSchema = APIResponseSchema.required({
  timestamp: true,
}).extend({
  agentResponse: z.string(),
  systemMessage: z.string().optional(),
  error: z.any().optional(),
  options: ConnectResponseOptionsSchema.optional(),
});
export type ConnectResponse = z.infer<typeof ConnectResponseSchema>;
