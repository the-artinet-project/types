/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { APIRequestSchema, APIResponseSchema } from "../api.js";
import { GroupSchema } from "../../runtime/group.js";

/**
 * Schema for group creation/update requests.
 */
export const CreateGroupRequestSchema = APIRequestSchema.extend({
  /** Target group identifier */
  groupId: z.string(),
  /** Group configuration data */
  group: GroupSchema,
  /** Optional options */
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated GroupRequest */
export type CreateGroupRequest = z.infer<typeof CreateGroupRequestSchema>;
export type GroupRequest = CreateGroupRequest;
/**
 * Schema for group operation responses.
 */
export const CreateGroupResponseSchema = APIResponseSchema.extend({
  /** The group identifier */
  groupId: z.string(),
  /** Whether the operation succeeded */
  success: z.boolean(),
});

/** Type alias for validated GroupResponse */
export type CreateGroupResponse = z.infer<typeof CreateGroupResponseSchema>;
export type GroupResponse = CreateGroupResponse;
