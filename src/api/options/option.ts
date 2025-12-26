/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";

export const BaseOptionsSchema = z.object({
  params: z.record(z.string(), z.unknown()).optional(),
});
export type BaseOptions = z.output<typeof BaseOptionsSchema>;
