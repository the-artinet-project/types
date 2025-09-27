import z from "zod";
import { BaseSchema, RemoteServerSchema, WithKindSchema } from "./base.js";

export const ArtinetAgentSchema = BaseSchema.partial({
  id: true,
}).extend({
  uri: z.string(),
});
export type ArtinetAgent = z.infer<typeof ArtinetAgentSchema>;

export const AgentCallSchema = ArtinetAgentSchema.extend({
  directive: z.string(),
});
export type AgentCall = z.infer<typeof AgentCallSchema>;

export const AgentCallResultSchema = AgentCallSchema.extend({
  result: z.string(),
});
export type AgentCallResult = z.infer<typeof AgentCallResultSchema>;

export const RemoteAgentSchema = RemoteServerSchema;
export type RemoteAgent = z.infer<typeof RemoteAgentSchema>;

export const AgentServerSchema = z.union([
  ArtinetAgentSchema,
  RemoteAgentSchema,
]);
export type AgentServer = z.infer<typeof AgentServerSchema>;

export const AgentRequestSchema = AgentCallSchema.extend(WithKindSchema.shape)
  .extend({
    kind: z.literal("agent_request").default("agent_request"),
  })
  .refine((data) => data.kind === "agent_request", {
    message: "Kind must be agent_request",
  });
export type AgentRequest = z.infer<typeof AgentRequestSchema>;

export const AgentResponseSchema = AgentCallResultSchema.extend(
  WithKindSchema.shape
)
  .extend({
    kind: z.literal("agent_response").default("agent_response"),
  })
  .refine((data) => data.kind === "agent_response", {
    message: "Kind must be agent_response",
  });
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
