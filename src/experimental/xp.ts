/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { FilePartSchema } from "../protocols/a2a/parameters.js";
import { TextPartSchema } from "../protocols/a2a/parameters.js";
import { DataPartSchema } from "../protocols/a2a/parameters.js";
import { KindSchema } from "../protocols/a2a/kind.js";
// Emerging compat layer for the openai API standard
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 *  @description Represents the role of a message sender.
 */
export const RoleSchema = z.enum([
  "user",
  "agent",
  "developer",
  "system",
  "assistant",
  "tool",
  "function",
]);
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type Role = z.infer<typeof RoleSchema>;
export const Role = RoleSchema.enum;
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const FileContentSchema = FilePartSchema.partial({
  kind: true,
}).extend({
  type: z.literal(KindSchema.enum["file"]),
});
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type FileContent = z.infer<typeof FileContentSchema>;
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const TextContentSchema = TextPartSchema.partial({
  kind: true,
}).extend({
  type: z.literal(KindSchema.enum["text"]),
});
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type TextContent = z.infer<typeof TextContentSchema>;
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const DataContentSchema = DataPartSchema.partial({
  kind: true,
}).extend({
  type: z.literal(KindSchema.enum["data"]),
});
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type DataContent = z.infer<typeof DataContentSchema>;

export const ContentSchema = z.discriminatedUnion("type", [
  FileContentSchema,
  TextContentSchema,
  DataContentSchema,
]);
export type Content = z.infer<typeof ContentSchema>;

export const FunctionSchema = z.object({
  name: z.string(),
  arguments: z.string(),
});
export type Function = z.infer<typeof FunctionSchema>;

export const CreateCompletionSchema = z.looseObject({
  messages: z.array(
    z.object({
      name: z.string().optional(),
      role: RoleSchema,
      content: z.string().or(z.array(ContentSchema)),
    })
  ),
  model: z.string(),
  max_completion_tokens: z.number().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  modalities: z.array(z.enum(["text", "audio"])).optional(),
  parrallel_tool_calls: z.boolean().optional(),
  n: z.number().optional(),
  user: z.string().optional(),
  verbosity: z.enum(["low", "medium", "high"]).optional(),
  // tools: z.array(FunctionToolSchema).optional(),
});
export type CreateCompletion = z.infer<typeof CreateCompletionSchema>;
