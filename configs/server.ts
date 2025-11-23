import { z } from "zod";
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

export const ServerSchema = ServerConfigSchema.extend({
  type: z.enum(["mcp", "a2a"]).describe("The type of server"),
});
export type Server = z.infer<typeof ServerSchema>;

export const ToolServerSchema = ServerSchema.extend({
  type: z.literal("mcp").default("mcp"),
});
export type ToolServer = z.infer<typeof ToolServerSchema>;

export const AgentServerSchema = ServerSchema.extend({
  type: z.literal("a2a").default("a2a"),
});
export type AgentServer = z.infer<typeof AgentServerSchema>;

export const LocalAgentSchema = AgentServerSchema.omit({
  url: true,
  headers: true,
}).extend({
  uri: z.string().describe("The URI of the agent."),
  //todo levarage parameters instead of AgentCardSchema
});
export type LocalAgent = z.infer<typeof LocalAgentSchema>;

export const LocalToolSchema = ToolServerSchema.omit({
  url: true,
  headers: true,
}).extend({
  uri: z.string().describe("The URI of the tool."),
  //todo levarage parameters instead of command and args
  command: z.string().describe("The command to be used to start the tool."),
  args: z
    .array(z.string())
    .describe("The arguments to be used to start the tool."),
});
export type LocalTool = z.infer<typeof LocalToolSchema>;

export const AgentServiceSchema = z.union([
  AgentServerSchema,
  LocalAgentSchema,
]);
export type AgentService = z.infer<typeof AgentServiceSchema>;

export const ToolServiceSchema = z.union([ToolServerSchema, LocalToolSchema]);
export type ToolService = z.infer<typeof ToolServiceSchema>;

export const ServiceSchema = z.union([AgentServiceSchema, ToolServiceSchema]);
export type Service = z.infer<typeof ServiceSchema>;
