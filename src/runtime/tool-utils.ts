import type { ZodRawShapeCompat, AnySchema } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

type ToolInputArgs = AnySchema | ZodRawShapeCompat | undefined;
type ToolOutputArgs = AnySchema | ZodRawShapeCompat;

export interface Config<InputArgs extends ToolInputArgs = AnySchema, OutputArgs extends ToolOutputArgs = AnySchema> {
    title?: string;
    description?: string;
    inputSchema?: InputArgs;
    outputSchema?: OutputArgs;
    annotations?: ToolAnnotations;
    _meta?: Record<string, unknown>;
}

export interface Definition<InputArgs extends ToolInputArgs = AnySchema, OutputArgs extends ToolOutputArgs = AnySchema> {
  name: string;
  definition: Config<InputArgs, OutputArgs>;
  callback: ToolCallback<InputArgs>;
}