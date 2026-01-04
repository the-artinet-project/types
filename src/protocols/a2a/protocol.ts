/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod/v4";
import {
  MessageSendParamsSchema,
  SendMessageRequestSchema,
  SendMessageResponseSchema,
  SendStreamingMessageRequestSchema,
  SendStreamingMessageResponseSchema,
  SendMessageSuccessResultSchema,
  SendStreamingMessageSuccessResultSchema,
} from "./message.js";
import {
  GetTaskRequestSchema,
  GetTaskResponseSchema,
  CancelTaskRequestSchema,
  CancelTaskResponseSchema,
  TaskResubscriptionRequestSchema,
  TaskIdParamsSchema,
  TaskQueryParamsSchema,
  TaskSchema,
} from "./task.js";
import {
  SetTaskPushNotificationConfigRequestSchema,
  SetTaskPushNotificationConfigResponseSchema,
  GetTaskPushNotificationConfigRequestSchema,
  GetTaskPushNotificationConfigResponseSchema,
  DeleteTaskPushNotificationConfigRequestSchema,
  ListTaskPushNotificationConfigRequestSchema,
  DeleteTaskPushNotificationConfigResponseSchema,
  ListTaskPushNotificationConfigResponseSchema,
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigResultSchema,
} from "./notification.js";
import {
  GetAuthenticatedExtendedCardRequestSchema,
  GetAuthenticatedExtendedCardResponseSchema,
  AgentCardSchema,
} from "./agent.js";

/**
 * @description Union of all valid A2A request types defined in the protocol.
 * @description Represents any valid JSON-RPC request defined in the A2A protocol.
 */
export const A2ARequestSchema = z.discriminatedUnion("method", [
  SendMessageRequestSchema,
  SendStreamingMessageRequestSchema,
  TaskResubscriptionRequestSchema,
  GetTaskRequestSchema,
  CancelTaskRequestSchema,
  SetTaskPushNotificationConfigRequestSchema,
  GetTaskPushNotificationConfigRequestSchema,
  ListTaskPushNotificationConfigRequestSchema,
  DeleteTaskPushNotificationConfigRequestSchema,
  GetAuthenticatedExtendedCardRequestSchema,
]);

export const RequestParamSchema = z.union([
  MessageSendParamsSchema,
  TaskIdParamsSchema,
  TaskQueryParamsSchema,
  TaskPushNotificationConfigSchema,
  GetTaskPushNotificationConfigParamsSchema,
  ListTaskPushNotificationConfigParamsSchema,
  DeleteTaskPushNotificationConfigParamsSchema,
  z.null(),
]);

/**
 * @description Union of all valid A2A response types defined in the protocol.
 * @description Represents any valid JSON-RPC response defined in the A2A protocol.
 * (This is a helper type, not explicitly defined with `oneOf` in the spec like A2ARequest, but useful).
 */
export const A2AResponseSchema = z.union([
  SendMessageResponseSchema,
  SendStreamingMessageResponseSchema,
  GetTaskResponseSchema,
  CancelTaskResponseSchema,
  SetTaskPushNotificationConfigResponseSchema,
  GetTaskPushNotificationConfigResponseSchema,
  ListTaskPushNotificationConfigResponseSchema,
  DeleteTaskPushNotificationConfigResponseSchema,
  GetAuthenticatedExtendedCardResponseSchema,
]);

export const ResponseResultSchema = z.union([
  SendMessageSuccessResultSchema,
  SendStreamingMessageSuccessResultSchema,
  TaskSchema,
  TaskPushNotificationConfigSchema,
  ListTaskPushNotificationConfigResultSchema,
  AgentCardSchema,
  z.null(),
]);
export type RequestParam = z.output<typeof RequestParamSchema>;
export type ResponseResult = z.output<typeof ResponseResultSchema>;
export type A2ARequest = z.output<typeof A2ARequestSchema>;
export type A2AResponse = z.output<typeof A2AResponseSchema>;
