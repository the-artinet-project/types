/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import {
  AgentRequestSchema,
  AgentResponseSchema,
} from "../../runtime/agent.js";
import { AgentServiceSchema } from "../../runtime/agent.js";

export const AgentOptions = z.object({
  services: z.array(AgentServiceSchema).optional(),
  requests: z.array(AgentRequestSchema).optional(),
  responses: z
    .array(AgentResponseSchema)
    .optional()
    .describe("A list of responses to agent requests."),
});
export type AgentOptions = z.infer<typeof AgentOptions>;

export const AgentResponseOptions = z.object({
  requests: z.array(AgentRequestSchema).optional(),
  responses: z.array(AgentResponseSchema).optional(),
});
export type AgentResponseOptions = z.infer<typeof AgentResponseOptions>;
