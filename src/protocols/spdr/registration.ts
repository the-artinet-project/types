import { z } from "zod/v4";

export const EndpointSchema = z.object({
  url: z.string(),
  type: z.string().optional(),
  authentication: z.boolean().optional(),
  description: z.string().optional(),
  metadata: z
    .record(z.string(), z.unknown())
    .describe("Additional endpoint-specific metadata")
    .optional(),
  protocols: z
    .array(z.string())
    .describe("List of protocols supported by the endpoint")
    .optional(),
  additionalProperties: z.unknown().optional(),
});
export type Endpoint = z.infer<typeof EndpointSchema>;

export const CommunicationSchema = z.object({
  endpoints: z.array(EndpointSchema),
  custom: z
    .record(z.string(), z.unknown())
    .describe("Custom communication configurations")
    .optional(),
});
export type Communication = z.infer<typeof CommunicationSchema>;

export const BillingSchema = z.object({
  walletAddress: z
    .string()
    .regex(new RegExp("^0x[a-fA-F0-9]{40}$"))
    .describe("Ethereum address for billing purposes")
    .optional(),
  network: z
    .string()
    .describe("Network identifier for the wallet address")
    .optional(),
  currency: z.string().describe("Preferred payment currency").optional(),
  paymentMethods: z
    .array(z.enum(["ETH", "ERC20", "FIAT", "OTHER"]))
    .describe("Accepted payment methods")
    .optional(),
  customBillingInfo: z
    .record(z.string(), z.unknown())
    .describe("Additional billing-specific information")
    .optional(),
});
export type Billing = z.infer<typeof BillingSchema>;

export const RSAKeySchema = z.object({
  kty: z.literal("RSA").optional(),
  n: z.string().describe("RSA modulus"),
  e: z.string().describe("RSA public exponent"),
});
export type RSAKey = z.infer<typeof RSAKeySchema>;

export const ECKeySchema = z.object({
  kty: z.literal("EC").optional(),
  crv: z
    .enum(["P-256", "P-384", "P-521", "secp256k1"])
    .describe("Curve type for EC keys"),
  x: z.string().describe("X coordinate for EC keys"),
  y: z.string().describe("Y coordinate for EC keys"),
});
export type ECKey = z.infer<typeof ECKeySchema>;

export const PublicKeySchema = z
  .object({
    kty: z.enum(["RSA", "EC"]).describe("Key Type"),
    kid: z.string().describe("Key ID").optional(),
    alg: z.string().describe("Algorithm").optional(),
  })
  .and(
    z.unknown().check((x) => {
      const schemas = [RSAKeySchema, ECKeySchema];
      const errors = schemas.reduce<z.ZodError[]>(
        (errors, schema) =>
          ((result) => (result.error ? [...errors, result.error] : errors))(
            schema.safeParse(x)
          ),
        []
      );
      if (schemas.length - errors.length !== 1) {
        throw new z.ZodError([
          {
            code: "invalid_union",
            message: "Invalid input: Should pass single schema",
            path: [],
            input: x,
            errors: errors.map((error) => error.issues),
          },
        ]);
      }
    })
  );
export type PublicKey = z.infer<typeof PublicKeySchema>;

export const SchemaVersionSchema = z
  .string()
  .regex(new RegExp("^\\d+\\.\\d+\\.\\d+$"))
  .describe("Version of the registration schema")
  .default("1.0.1");
export type SchemaVersion = z.infer<typeof SchemaVersionSchema>;

export const ServiceNameSchema = z
  .string()
  .regex(new RegExp("^[a-zA-Z0-9-_./ ]+$"))
  .max(128)
  .describe("Human-readable name of the service");
export type ServiceName = z.infer<typeof ServiceNameSchema>;

export const DescriptionSchema = z
  .string()
  .max(500)
  .describe("Brief description of the service's functionality");
export type Description = z.infer<typeof DescriptionSchema>;

export const VersionSchema = z
  .string()
  .regex(new RegExp("^\\d+\\.\\d+\\.\\d+$"))
  .describe("Version of the service (semantic versioning)");
export type Version = z.infer<typeof VersionSchema>;

export const CapabilitiesSchema = z
  .array(
    z
      .string()
      .max(64)
      .describe("Capability must be letters with hyphens and underscores only")
      .regex(new RegExp("^[a-zA-Z0-9-_ ]+$"))
  )
  .max(5)
  .describe("List of functionalities or features provided by the service");
export type Capabilities = z.infer<typeof CapabilitiesSchema>;

export const TagsSchema = z
  .array(
    z
      .string()
      .max(128)
      .describe(
        "Tag must be lowercase letters with hyphens and underscores only"
      )
      .regex(new RegExp("^[a-zA-Z0-9-_:+./\\s ]+$"))
  )
  .describe("List of tags for the service");
export type Tags = z.infer<typeof TagsSchema>;

//TODO: Add License Schema
export const RegistrationSchema = z
  .object({
    schemaVersion: SchemaVersionSchema,
    serviceName: ServiceNameSchema,
    description: DescriptionSchema,
    version: VersionSchema,
    capabilities: CapabilitiesSchema,
    communication: CommunicationSchema,
    tags: TagsSchema.optional(),
    license: z.string().optional(),
    registrationDate: z.iso.datetime({ offset: true }).optional(),
    metadata: z
      .record(z.string(), z.unknown())
      .describe("Additional service-specific metadata")
      .optional(),
    billing: BillingSchema.describe(
      "Optional billing information for the service"
    ).optional(),
    publicKey: PublicKeySchema.describe(
      "Public key for the service"
    ).optional(),
  })
  .describe("JSON Schema for Artinet Registrations");
export type Registration = z.infer<typeof RegistrationSchema>;
