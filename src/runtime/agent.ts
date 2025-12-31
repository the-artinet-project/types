/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import z from "zod/v4";
import { BaseSchema, CallerIdSchema, WithKindSchema } from "../base.js";
import { ServerSchema } from "./server.js";
import { MessageSchema, TaskSchema } from "../protocols/a2a/index.js";
import { AgentCardSchema } from "../protocols/a2a/agent.js";

export const AgentInfoSchema = BaseSchema.partial({
  id: true,
})
  .extend({
    uri: z.string().describe("The URI of the agent."),
  })
  .extend(AgentCardSchema.shape).describe(`
Agent Info Schema:
Used for type checking and potential post-processing.
The agent info may represent an entirely different type of object.
`);
export type AgentInfo = z.output<typeof AgentInfoSchema>;
export const isAgentInfo = (info: any): info is AgentInfo =>
  AgentInfoSchema.safeParse(info).success;

export const AgentServerSchema = ServerSchema.extend({
  uri: z.string().describe("The URI of the agent."),
  type: z.literal("a2a").default("a2a"),
  info: AgentInfoSchema.describe("The info of the agent."),
});
export type AgentServer = z.output<typeof AgentServerSchema>;

//A runtime locked representation of an agent
export const AgentInstanceSchema = AgentServerSchema.partial({
  url: true,
  headers: true,
}).extend({
  info: AgentInfoSchema.describe(`
The info of the agent. 
If not provided, the info will be fetched from the URI.
Optional for now, but may become required in the future.
Strongly encouraged to provide the info if possible.
`),
});
export type AgentInstance = z.output<typeof AgentInstanceSchema>;
/**
 * @deprecated use AgentInstanceSchema instead
 */
export const LocalAgentSchema = AgentInstanceSchema;
/**
 * @deprecated use AgentInstance instead
 */
export type LocalAgent = z.output<typeof LocalAgentSchema>;

export const AgentServiceSchema = z
  .union([AgentServerSchema, AgentInstanceSchema])
  .describe("An agent service is a server or instance of an agent.");
export type AgentService = z.output<typeof AgentServiceSchema>;

export const isAgentServer = (agent: unknown): agent is AgentServer =>
  AgentServiceSchema.safeParse(agent).success;

export const isAgentInstance = (agent: unknown): agent is AgentInstance =>
  AgentInstanceSchema.safeParse(agent).success;

export const isAgentService = (service: unknown): service is AgentService =>
  AgentServiceSchema.safeParse(service).success;

export const AgentCallSchema = AgentInstanceSchema.required({
  id: true,
})
  .partial({
    info: true,
  })
  .extend({
    call: z
      .union([MessageSchema, z.string()])
      .describe("The message being sent to the agent."),
  });
export type AgentCall = z.output<typeof AgentCallSchema>;

//A structure suitable for transporting calls across runtime boundaries
export const AgentRequestSchema = AgentCallSchema.extend(WithKindSchema.shape)
  .extend(CallerIdSchema.shape)
  .extend({
    kind: z.literal("agent_request").default("agent_request"),
  })
  .refine((data) => data.kind === "agent_request", {
    message: "Kind must be agent_request",
  })
  .describe(
    "A structure suitable for transporting calls across runtime boundaries"
  );

export type AgentRequest = z.output<typeof AgentRequestSchema>;
/**
 * @description Checks if the given object is a valid AgentRequest.
 * @param req - The object to check.
 * @returns True if the object is a valid AgentRequest, false otherwise.
 */
export const isAgentRequest = (req: unknown): req is AgentRequest =>
  AgentRequestSchema.safeParse(req).success;

export const AgentCallResultSchema = AgentCallSchema.extend({
  result: z
    .union([MessageSchema, TaskSchema, z.string()])
    .describe("The result of the agent call."),
  error: z.unknown().optional().describe("The error of the agent call."),
});
export type AgentCallResult = z.output<typeof AgentCallResultSchema>;

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
export type AgentResponse = z.output<typeof AgentResponseSchema>;

export const isAgentResponse = (res: unknown): res is AgentResponse =>
  AgentResponseSchema.safeParse(res).success;
