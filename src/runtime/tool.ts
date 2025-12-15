/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { BaseSchema, CallerIdSchema, WithKindSchema } from "../base.js";
import { MCP } from "../protocols/index.js";
import { ServiceConfigSchema } from "./server.js";

export const ToolInfoSchema = BaseSchema.partial({
  id: true,
})
  .extend({
    implementation: MCP.ImplementationSchema,
    serverCapabilities: MCP.ServerCapabilitiesSchema,
    tools: z.array(MCP.ToolSchema),
    resources: z.array(MCP.ResourceSchema),
    prompts: z.array(MCP.PromptSchema),
    instructions: z.string().optional(),
  })
  .describe("The info of the tool.");
export type ToolInfo = z.infer<typeof ToolInfoSchema>;

export const ToolServerSchema = ServiceConfigSchema.extend({
  type: z.literal("mcp").default("mcp"),
  //This is optional because Servers may not have an info object on instantiation.
  info: ToolInfoSchema.optional().describe("The info of the tool."),
});
export type ToolServer = z.infer<typeof ToolServerSchema>;

export const MCPStdioArgumentsSchema = z.object({
  command: z.string().describe("The command to be used to start the tool."),
  args: z
    .array(z.string())
    .describe("The arguments to be used to start the tool."),
});
export type MCPStdioArguments = z.infer<typeof MCPStdioArgumentsSchema>;

//TODO: add support for in-memory mcp & function-calling
export const ToolInstanceArgumentsSchema = z.union([
  MCPStdioArgumentsSchema,
  z.unknown(),
]);
export type ToolInstanceArguments = z.infer<typeof ToolInstanceArgumentsSchema>;

//A runtime locked representation of a tool.
export const ToolInstanceSchema = ToolServerSchema.omit({
  url: true,
  //? Maybe we should keep headers?
  headers: true,
}).extend({
  uri: z.string().describe("The URI of the tool."),
  arguments: ToolInstanceArgumentsSchema.describe(
    "The arguments to be used to start the tool."
  ),
  info: ToolInfoSchema.partial().required({
    implementation: true,
  }),
});
export type ToolInstance = z.infer<typeof ToolInstanceSchema>;
/**
 * @deprecated use ToolInstanceSchema instead
 */
export const LocalToolSchema = ToolInstanceSchema;
/**
 * @deprecated use ToolInstance instead
 */
export type LocalTool = z.infer<typeof LocalToolSchema>;

export const ToolServiceSchema = z.union([
  ToolServerSchema,
  ToolInstanceSchema,
]);
export type ToolService = z.infer<typeof ToolServiceSchema>;

export const isToolServer = (tool: ToolService): tool is ToolServer => {
  return ToolServerSchema.safeParse(tool).success;
};

export const isToolInstance = (tool: ToolService): tool is ToolInstance => {
  return ToolInstanceSchema.safeParse(tool).success;
};

export const ToolCallSchema = ToolInstanceSchema.partial({
  type: true,
  id: true,
}).extend({
  call: MCP.CallToolRequestParamsSchema.describe(
    "The call to invoke the tool."
  ),
});
export type ToolCall = z.infer<typeof ToolCallSchema>;

//A structure suitable for transporting calls across runtime boundaries
export const ToolRequestSchema = ToolCallSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.required().shape)
  .extend({
    kind: z.literal("tool_request").default("tool_request"),
  })
  .refine((data) => data.kind === "tool_request", {
    message: "Kind must be tool_request",
  });
export type ToolRequest = z.infer<typeof ToolRequestSchema>;

export const ToolCallResultSchema = ToolCallSchema.extend({
  result: MCP.CallToolResultSchema.describe("The result of the tool call."),
  error: z.unknown().optional().describe("The error of the tool call."),
});
export type ToolCallResult = z.infer<typeof ToolCallResultSchema>;

export const ToolResponseSchema = ToolCallResultSchema.extend(
  WithKindSchema.shape
)
  .extend(CallerIdSchema.required().shape)
  .extend({
    kind: z.literal("tool_response").default("tool_response"),
  })
  .refine((data) => data.kind === "tool_response", {
    message: "Kind must be tool_response",
  });
export type ToolResponse = z.infer<typeof ToolResponseSchema>;
