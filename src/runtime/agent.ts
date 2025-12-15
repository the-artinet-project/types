/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { BaseSchema, CallerIdSchema, WithKindSchema } from "../base.js";
import { ServerSchema } from "./server.js";
import { MessageSchema, TaskSchema } from "../protocols/a2a/index.js";
import { AgentCardSchema } from "../protocols/a2a/agent.js";

//TODO: We may want to align the AgentDefinitionSchema with AgentInfo vs AgentCard
//Why? Because AgentInfo is more flexible and can represent an entirely different type of object.
//We want to avoid having two different schemas for the same object outside of the SDK (sufficient to have AgentCard fully defined in the SDK).
export const AgentInfoSchema = BaseSchema.extend({
  uri: z.string().optional().describe("The URI of the agent."),
}).extend(
  AgentCardSchema.partial({
    url: true,
  }).shape
).describe(`
Agent Info Schema:
Used for type checking and potential post-processing.
The agent info may represent an entirely different type of object.
`);
export type AgentInfo = z.infer<typeof AgentInfoSchema>;

export const AgentServerSchema = ServerSchema.extend({
  type: z.literal("a2a").default("a2a"),
  //This is optional because Servers may not have an info object on instantiation.
  info: AgentInfoSchema.required({
    url: true,
  })
    .optional()
    .describe("The info of the agent."),
});
export type AgentServer = z.infer<typeof AgentServerSchema>;

//A runtime locked representation of an agent
export const AgentInstanceSchema = AgentServerSchema.omit({
  url: true,
  headers: true,
}).extend({
  uri: z.string().describe("The URI of the agent."),

  info: AgentInfoSchema.required({
    uri: true,
    capabilities: true,
  })
    .required()
    .describe(
      `The info of the agent. 
If not provided, the info will be fetched from the URI.
Optional for now, but may become required in the future.
Strongly encouraged to provide the info if possible.`
    ),
});
export type AgentInstance = z.infer<typeof AgentInstanceSchema>;
/**
 * @deprecated use AgentInstanceSchema instead
 */
export const LocalAgentSchema = AgentInstanceSchema;
/**
 * @deprecated use AgentInstance instead
 */
export type LocalAgent = z.infer<typeof LocalAgentSchema>;

export const AgentServiceSchema = z.union([
  AgentServerSchema,
  AgentInstanceSchema,
]);
export type AgentService = z.infer<typeof AgentServiceSchema>;

export const isAgentServer = (agent: AgentService): agent is AgentServer => {
  return AgentServiceSchema.safeParse(agent).success;
};

export const isAgentInstance = (
  agent: AgentService
): agent is AgentInstance => {
  return AgentInstanceSchema.safeParse(agent).success;
};

export const AgentCallSchema = AgentInstanceSchema.partial({
  //TODO: make type & id required
  type: true,
  id: true,
}).extend({
  call: z
    .union([MessageSchema, TaskSchema, z.string()])
    .describe("The call the agent."),
});
export type AgentCall = z.infer<typeof AgentCallSchema>;

//A structure suitable for transporting calls across runtime boundaries
export const AgentRequestSchema = AgentCallSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.required().shape)
  .extend({
    kind: z.literal("agent_request").default("agent_request"),
  })
  .refine((data) => data.kind === "agent_request", {
    message: "Kind must be agent_request",
  })
  .describe(
    "A structure suitable for transporting calls across runtime boundaries"
  );
export type AgentRequest = z.infer<typeof AgentRequestSchema>;

//TODO: Add Update Events to the result union (likely for platform v0.2)
export const AgentCallResultSchema = AgentCallSchema.extend({
  result: z
    .union([MessageSchema, TaskSchema, z.string()])
    .describe("The result of the agent call."),
  error: z.unknown().optional().describe("The error of the agent call."),
});
export type AgentCallResult = z.infer<typeof AgentCallResultSchema>;

export const AgentResponseSchema = AgentCallResultSchema.extend(
  WithKindSchema.shape
)
  .extend(CallerIdSchema.required().shape)
  .extend({
    kind: z.literal("agent_response").default("agent_response"),
  })
  .refine((data) => data.kind === "agent_response", {
    message: "Kind must be agent_response",
  });
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
