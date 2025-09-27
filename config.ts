import { z } from "zod";
import { RemoteServerSchema } from "./base.js";

export const BaseConfigSchema = z.object({
  blocklist: z.array(z.string()).optional(),
});
export type BaseConfig = z.infer<typeof BaseConfigSchema>;

export const RemoteServerConfigSchema = RemoteServerSchema.partial({
  id: true,
}).extend(BaseConfigSchema.shape);
export type RemoteServerConfig = z.infer<typeof RemoteServerConfigSchema>;

export const LocalServerConfigSchema = BaseConfigSchema.extend({
  command: z.string(),
  args: z.array(z.string()),
});
export type LocalServerConfig = z.infer<typeof LocalServerConfigSchema>;

export const ServerConfigSchema = z.union([
  RemoteServerConfigSchema,
  LocalServerConfigSchema,
]);
export type ServerConfig = z.infer<typeof ServerConfigSchema>;

export const ConfigSchema = z.record(z.string(), ServerConfigSchema);
export type Config = z.infer<typeof ConfigSchema>;
