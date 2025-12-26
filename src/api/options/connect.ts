/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { BaseOptionsSchema } from "./option.js";
import { ToolOptions, ToolResponseOptions } from "./tool.js";
import { AgentOptions, AgentResponseOptions } from "./agent.js";

export const ConnectOptionsSchema = BaseOptionsSchema.extend({
  initialized: z.boolean().optional(),
  isAuthRequired: z.boolean().optional(),
  isFallbackAllowed: z.boolean().optional(),
  tools: ToolOptions.optional(),
  agents: AgentOptions.optional(),
});
export type ConnectOptions = z.output<typeof ConnectOptionsSchema>;

export const ConnectResponseOptionsSchema = BaseOptionsSchema.extend({
  tools: ToolResponseOptions.optional(),
  agents: AgentResponseOptions.optional(),
});
export type ConnectResponseOptions = z.output<
  typeof ConnectResponseOptionsSchema
>;
