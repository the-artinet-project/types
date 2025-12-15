/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import {
  ToolServiceSchema,
  ToolRequestSchema,
  ToolResponseSchema,
} from "../../runtime/tool.js";

export const ToolOptions = z.object({
  services: z.array(ToolServiceSchema).optional(),
  responses: z.array(ToolResponseSchema).optional(),
});
export type ToolOptions = z.infer<typeof ToolOptions>;

export const ToolResponseOptions = z.object({
  requests: z.array(ToolRequestSchema),
  responses: z.array(ToolResponseSchema),
});
export type ToolResponseOptions = z.infer<typeof ToolResponseOptions>;
