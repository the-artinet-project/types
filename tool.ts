import { z } from "zod";
import { BaseSchema, CallerIdSchema, WithKindSchema } from "./base.js";
import {
  ImplementationSchema,
  ResourceSchema,
  PromptSchema,
  ToolSchema,
  ServerCapabilitiesSchema,
  CallToolRequestSchema,
  CallToolResultSchema,
} from "@modelcontextprotocol/sdk/types.js";

export const ToolInfoSchema = BaseSchema.partial({
  id: true,
}).extend({
  implementation: ImplementationSchema,
  serverCapabilities: ServerCapabilitiesSchema,
  tools: z.array(ToolSchema),
  resources: z.array(ResourceSchema),
  prompts: z.array(PromptSchema),
  instructions: z.string().optional(),
});
export type ToolInfo = z.infer<typeof ToolInfoSchema>;

export const ToolRequestSchema = BaseSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.shape)
  .extend({
    kind: z.literal("tool_request").default("tool_request"),
    callToolRequest: CallToolRequestSchema,
  })
  .refine((data) => data.kind === "tool_request", {
    message: "Kind must be tool_request",
  });
export type ToolRequest = z.infer<typeof ToolRequestSchema>;

export const ToolResponseSchema = BaseSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.shape)
  .extend({
    kind: z.literal("tool_response").default("tool_response"),
    name: z.string(),
    callToolRequest: CallToolRequestSchema.optional(),
    callToolResult: CallToolResultSchema,
  })
  .refine((data) => data.kind === "tool_response", {
    message: "Kind must be tool_response",
  });
export type ToolResponse = z.infer<typeof ToolResponseSchema>;
