/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod";
import { BaseSchema } from "../base.js";

export const MessageRoleSchema = z.enum(["user", "agent", "system"]);
export type MessageRole = z.infer<typeof MessageRoleSchema>;
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
