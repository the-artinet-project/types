/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { BaseSchema } from "../base.js";

export const ServerConfigSchema = BaseSchema.extend({
  url: z.url().describe("The URL of the server."),
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
export type ServerConfig = z.output<typeof ServerConfigSchema>;

export const ServiceConfigSchema = ServerConfigSchema.extend({
  //TODO: rename type to protocol
  //TODO: use type to support more types of services mcp_instance, tool_instance, a2a_instance, a2a_server, mcp_server ??
  type: z.enum(["mcp", "a2a"]).describe("The type of server"),
}).describe("A service config is a server config with a type.");
export type ServiceConfig = z.output<typeof ServiceConfigSchema>;

/**
 * @deprecated use ServiceConfigSchema instead
 */
export const ServerSchema = ServiceConfigSchema;
/**
 * @deprecated use ServiceConfig instead
 */
export type Server = z.output<typeof ServerSchema>;
