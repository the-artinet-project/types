import z from "zod";
import { CallerIdSchema, WithKindSchema } from "../../base.js";
import { LocalAgentSchema } from "../server.js";

export const AgentCallSchema = LocalAgentSchema.partial({
  type: true,
  id: true,
}).extend({
  directive: z.string().describe("The directive to be used to call the agent."),
});
export type AgentCall = z.infer<typeof AgentCallSchema>;

export const AgentCallResultSchema = AgentCallSchema.extend({
  result: z.string().describe("The result of the agent call."),
});
export type AgentCallResult = z.infer<typeof AgentCallResultSchema>;

export const AgentRequestSchema = AgentCallSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.shape)
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
  .extend(CallerIdSchema.shape)
  .extend({
    kind: z.literal("agent_response").default("agent_response"),
  })
  .refine((data) => data.kind === "agent_response", {
    message: "Kind must be agent_response",
  });
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
