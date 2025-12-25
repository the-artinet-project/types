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
  //TODO: rename type to protocol
  //TODO: use type to support more types of services mcp_instance, tool_instance, a2a_instance, a2a_server, mcp_server ??
  type: z.enum(["mcp", "a2a"]).describe("The type of server"),
}).describe("A service config is a server config with a type.");
export type ServiceConfig = z.infer<typeof ServiceConfigSchema>;

/**
 * @deprecated use ServiceConfigSchema instead
 */
export const ServerSchema = ServiceConfigSchema;
/**
 * @deprecated use ServiceConfig instead
 */
export type Server = z.infer<typeof ServerSchema>;
