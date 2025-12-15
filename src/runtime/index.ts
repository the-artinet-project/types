export * from "./agent.js";
export * from "./tool.js";
export * from "./server.js";

import { z } from "zod/v4";
import { AgentServiceSchema } from "./agent.js";
import { ToolServiceSchema } from "./tool.js";
export const ServiceSchema = z.union([AgentServiceSchema, ToolServiceSchema]);
export type Service = z.infer<typeof ServiceSchema>;
