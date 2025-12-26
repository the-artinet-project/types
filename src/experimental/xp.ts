/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import * as Session from "../api/routes/session.js";
import { BaseSchema } from "../base.js";
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
export type Role = z.output<typeof RoleSchema>;
export const Role = RoleSchema.enum;

/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const FunctionCallSchema = BaseSchema.required().extend({
  type: z.literal("function"),
  function: z.object({
    name: z.string(),
    arguments: z.string(),
  }),
});
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type FunctionCall = z.output<typeof FunctionCallSchema>;
export const isFunctionCall = (call: unknown): call is FunctionCall =>
  FunctionCallSchema.safeParse(call).success;

/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const CustomToolCallSchema = BaseSchema.extend({
  type: z.literal("custom"),
  custom: z.object({
    input: z.string(),
    name: z.string(),
  }),
});
/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type CustomToolCall = z.output<typeof CustomToolCallSchema>;
export const isCustomToolCall = (call: unknown): call is CustomToolCall =>
  CustomToolCallSchema.safeParse(call).success;

/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export const MessageSchema = Session.MessageSchema.extend({
  role: z.literal(Session.MessageRole.assistant),
  content: z.string().nullable(),
  tool_calls: z
    .array(
      z.discriminatedUnion("type", [FunctionCallSchema, CustomToolCallSchema])
    )
    .optional()
    .nullable(),
});

/**
 * @deprecated This is an experimental type, subject to rapid modification and its location will change.
 */
export type Message = z.output<typeof MessageSchema>;
export const isMessage = (message: unknown): message is Message =>
  MessageSchema.safeParse(message).success;

// export const CreateCompletionSchema = z.looseObject({
//   messages: z.array(
//     z.object({
//       name: z.string().optional(),
//       role: RoleSchema,
//       content: z.string().or(z.array(ContentSchema)),
//     })
//   ),
//   model: z.string(),
//   max_completion_tokens: z.number().optional(),
//   metadata: z.record(z.string(), z.any()).optional(),
//   modalities: z.array(z.enum(["text", "audio"])).optional(),
//   parrallel_tool_calls: z.boolean().optional(),
//   n: z.number().optional(),
//   user: z.string().optional(),
//   verbosity: z.enum(["low", "medium", "high"]).optional(),
//   // tools: z.array(FunctionToolSchema).optional(),
// });
// export type CreateCompletion = z.output<typeof CreateCompletionSchema>;
