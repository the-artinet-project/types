/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { BaseSchema } from "../../base.js";

//TODO: We'll attempt to merge in fields like A2A Messages here
export const MessageRoleSchema = z.enum([
  "user",
  "agent",
  "assistant",
  "system",
]);
export type MessageRole = z.infer<typeof MessageRoleSchema>;
export const MessageRole = MessageRoleSchema.enum;

export const SessionMessageSchema = BaseSchema.partial({
  id: true,
}).extend({
  role: MessageRoleSchema,
  content: z.string(),
});
export type SessionMessage = z.infer<typeof SessionMessageSchema>;
export type message = SessionMessage;

export const SessionSchema = BaseSchema.partial({
  id: true,
}).extend({
  messages: z.array(SessionMessageSchema),
});
export type Session = z.infer<typeof SessionSchema>;
