/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod";
import { ToolServerSchema, AgentServerSchema } from "../configs/server.js";
import {
  ToolInfoSchema,
  ToolRequestSchema,
  ToolResponseSchema,
} from "../configs/requests/tool.js";
import {
  AgentCallResultSchema,
  AgentRequestSchema,
  AgentResponseSchema,
} from "../configs/requests/agent.js";

//todo: move AgentCardSchema to types
import { AgentCardSchema } from "@artinet/sdk";

export const BaseOptionsSchema = z.object({
  params: z.record(z.unknown()).optional(),
});
export type BaseOptions = z.infer<typeof BaseOptionsSchema>;
//todo: remove remote servers & local servers with tool-services
export const ToolOptions = z.object({
  remoteServers: z.array(ToolServerSchema).optional(),
  //todo: use parameters instead of ToolInfoSchema
  localServers: z.array(ToolInfoSchema).optional(),
  results: z.array(ToolResponseSchema).optional(),
});
export type ToolOptions = z.infer<typeof ToolOptions>;

export const ToolResponseOptions = z.object({
  requests: z.array(ToolRequestSchema),
  results: z.array(ToolResponseSchema),
});
export type ToolResponseOptions = z.infer<typeof ToolResponseOptions>;

//todo: remove remote servers & local servers with agent-services
export const AgentOptions = z.object({
  remoteServers: z.array(AgentServerSchema).optional(),
  //todo: use parameters instead of AgentCardSchema
  localServers: z.array(AgentCardSchema).optional(),
  responses: z.array(AgentCallResultSchema).optional(),
});
export type AgentOptions = z.infer<typeof AgentOptions>;

export const AgentResponseOptions = z.object({
  requests: z.array(AgentRequestSchema),
  responses: z.array(AgentResponseSchema),
});
export type AgentResponseOptions = z.infer<typeof AgentResponseOptions>;

export const ConnectOptionsSchema = BaseOptionsSchema.extend({
  initialized: z.boolean().optional(),
  isAuthRequired: z.boolean().optional(),
  isFallbackAllowed: z.boolean().optional(),
  tools: ToolOptions.optional(),
  agents: AgentOptions.optional(),
});
export type ConnectOptions = z.infer<typeof ConnectOptionsSchema>;

export const ConnectResponseOptionsSchema = BaseOptionsSchema.extend({
  tools: ToolResponseOptions.optional(),
  agents: AgentResponseOptions.optional(),
});
export type ConnectResponseOptions = z.infer<
  typeof ConnectResponseOptionsSchema
>;
