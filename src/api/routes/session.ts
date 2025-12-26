/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { BaseSchema } from "../../base.js";
import { A2A } from "../../protocols/index.js";
//TODO: We'll attempt to merge in fields like A2A Messages & MCP Call Tool Results
//so that they're no longer out of band options
export const MessageRoleSchema = z.enum([
  "user",
  "agent",
  "assistant",
  "system",
]);
export type MessageRole = z.output<typeof MessageRoleSchema>;
export const MessageRole = MessageRoleSchema.enum;

export const MessageSchema = BaseSchema.partial({
  id: true,
}).extend({
  role: MessageRoleSchema,
  /**
   * We'll start with the most basic types and incrementally add more complex types (files/data)
   */
  content: z.union([z.string(), A2A.TextPartSchema]),
});
export type Message = z.output<typeof MessageSchema>;
export const isMessage = (message: unknown): message is Message => {
  return MessageSchema.safeParse(message).success;
};
export const SessionSchema = z.array(MessageSchema);
export type Session = z.output<typeof SessionSchema>;
export const isSession = (session: unknown): session is Session => {
  return SessionSchema.safeParse(session).success;
};
