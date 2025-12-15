/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { BaseSchema } from "../base.js";

export const ServerConfigSchema = BaseSchema.extend({
  url: z.string().url(), //todo: will need to remove .url() when migrating to zod/v4
}).extend({
  headers: z
    .record(z.string(), z.string())
    .optional()
    .describe(
      "An object containing custom HTTP headers to be sent with every request to this server."
    ),
  authToken: z
    .string()
    .optional()
    .describe("The authentication token to be used for the server."),
  parameters: z
    .record(z.string(), z.unknown())
    .optional()
    .describe("An object containing the parameters to be used for the server."),
});
export type ServerConfig = z.infer<typeof ServerConfigSchema>;

export const ServiceConfigSchema = ServerConfigSchema.extend({
  type: z.enum(["mcp", "a2a"]).describe("The type of server"),
});
export type ServiceConfig = z.infer<typeof ServiceConfigSchema>;

/**
 * @deprecated use ServiceConfigSchema instead
 */
export const ServerSchema = ServiceConfigSchema;
/**
 * @deprecated use ServiceConfig instead
 */
export type Server = z.infer<typeof ServerSchema>;
