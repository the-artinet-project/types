import z from "zod";
import { BaseSchema } from "../base.js";
import { SessionSchema } from "./session.js";
import {
  ConnectOptionsSchema,
  ConnectResponseOptionsSchema,
} from "./option.js";

export const ConnectRequestSchema = z.object({
  identifier: z.string(),
  session: SessionSchema,
  preferredEndpoint: z.string(),
  options: ConnectOptionsSchema,
});
export type ConnectRequest = z.infer<typeof ConnectRequestSchema>;

export const ConnectResponseSchema = BaseSchema.partial({
  id: true,
}).extend({
  agentResponse: z.string(),
  timestamp: z.string().datetime(),
  systemMessage: z.string().optional(),
  error: z.any().optional(),
  options: ConnectResponseOptionsSchema.optional(),
});
export type ConnectResponse = z.infer<typeof ConnectResponseSchema>;
