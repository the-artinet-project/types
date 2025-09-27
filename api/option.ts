import z from "zod";
import { RemoteServerSchema } from "../base.js";
import {
  ToolInfoSchema,
  ToolRequestSchema,
  ToolResponseSchema,
} from "../tool.js";
import {
  AgentCallResultSchema,
  AgentRequestSchema,
  AgentResponseSchema,
} from "../agent.js";
import { AgentCardSchema } from "@artinet/sdk";

export const BaseOptionsSchema = z.object({
  params: z.record(z.unknown()).optional(),
});
export type BaseOptions = z.infer<typeof BaseOptionsSchema>;

export const ToolOptions = z.object({
  remoteServers: z.array(RemoteServerSchema).optional(),
  localServers: z.array(ToolInfoSchema).optional(),
  results: z.array(ToolResponseSchema).optional(),
});
export type ToolOptions = z.infer<typeof ToolOptions>;

export const ToolResponseOptions = z.object({
  requests: z.array(ToolRequestSchema),
  results: z.array(ToolResponseSchema),
});
export type ToolResponseOptions = z.infer<typeof ToolResponseOptions>;

export const AgentOptions = z.object({
  remoteServers: z.array(RemoteServerSchema).optional(),
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
