import { z } from "zod/v4";
import { APIResponseSchema, APIRequestSchema } from "../api.js";
import { AgentCardSchema } from "../../protocols/a2a/agent.js";

export const BaseCreateAgentRequestSchema = APIRequestSchema.extend({
  agentId: z.string().optional(),
});
export type BaseCreateAgentRequest = z.infer<
  typeof BaseCreateAgentRequestSchema
>;

export const CreateAgentResponseSchema = APIResponseSchema.extend({
  agentId: z.string(),
  success: z.boolean(),
  receipt: z.object({
    uri: z.string(),
    name: z.string(),
    url: z.string(),
    path: z.string(),
    info: AgentCardSchema,
  }),
});
export type CreateAgentResponse = z.infer<typeof CreateAgentResponseSchema>;
