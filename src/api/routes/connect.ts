/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { SessionSchema, MessageSchema } from "./session.js";
import {
  ConnectOptionsSchema,
  ConnectResponseOptionsSchema,
} from "../options/index.js";
import { APIRequestSchema, APIResponseSchema } from "./base.js";

export const ConnectRequestSchema = APIRequestSchema.extend({
  identifier: z.string(),
  messages: SessionSchema,
  preferredEndpoint: z.string(),
  options: ConnectOptionsSchema.optional(),
});
export type ConnectRequest = z.infer<typeof ConnectRequestSchema>;
export const isConnectRequest = (
  request: unknown
): request is ConnectRequest => {
  return ConnectRequestSchema.safeParse(request).success;
};

export const ConnectResponseSchema = APIResponseSchema.required({
  timestamp: true,
}).extend({
  agentResponse: z.union([z.string(), MessageSchema]),
  systemMessage: z.string().optional(),
  error: z.any().optional(),
  options: ConnectResponseOptionsSchema.optional(),
});
export type ConnectResponse = z.infer<typeof ConnectResponseSchema>;
