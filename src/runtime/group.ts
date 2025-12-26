/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";

/**
 * Schema for agent group configuration.
 *
 * Groups bundle multiple agents together for orchestrated communication.
 */
export const GroupSchema = z.object({
  /** Unique group identifier */
  id: z.string(),
  /** Human-readable group name */
  name: z.string(),
  /** Description of the group's purpose */
  description: z.string(),
  /** Access level: PUBLIC (discoverable) or PRIVATE (owner only) */
  access: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),
  /** Array of member registration IDs */
  members: z.array(z.string()),
  /** User ID of the group owner */
  ownerId: z.string(),
  /** ISO datetime when group was created */
  created: z.iso.datetime(),
  /** ISO datetime of last update */
  updated: z.iso.datetime(),
  /** Optional additional metadata */
  metadata: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated Group */
export type Group = z.output<typeof GroupSchema>;
export const isGroup = (value: unknown): value is Group =>
  GroupSchema.safeParse(value).success;
