import z from "zod";

export const BaseSchema = z.object({
  id: z.string(),
});
export type Base = z.infer<typeof BaseSchema>;

export const CallerIdSchema = z.object({
  callerId: z.string().optional(),
});
export type CallerId = z.infer<typeof CallerIdSchema>;

export const WithKindSchema = z.object({
  kind: z.string(),
});
export type WithKind = z.infer<typeof WithKindSchema>;

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type JSON = Literal | { [key: string]: JSON } | JSON[];
export const JSONSchema: z.ZodType<JSON> = z.lazy(() =>
  z.union([literalSchema, z.array(JSONSchema), z.record(JSONSchema)])
);

export const ContextKindSchema = z.enum([
  "agent_request",
  "agent_response",
  "tool_request",
  "tool_response",
]);
export const ContextKind = ContextKindSchema.enum;
export type ContextKind = z.infer<typeof ContextKindSchema>;
