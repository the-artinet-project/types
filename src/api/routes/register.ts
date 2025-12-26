/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod/v4";
import { APIRequestSchema, APIResponseSchema } from "./base.js";
import { RegistrationSchema } from "../../protocols/spdr/registration.js";

/**
 * Schema for registration request validation.
 */
export const CreateRegistrationRequestSchema = APIRequestSchema.extend({
  /** The registration data to submit */
  registration: RegistrationSchema,
  options: z.record(z.string(), z.unknown()).optional(),
});

/** Type alias for validated RegistrationRequest */
export type CreateRegistrationRequest = z.output<
  typeof CreateRegistrationRequestSchema
>;
export type RegistrationRequest = CreateRegistrationRequest;
/**
 * Schema for registration response validation.
 */
export const CreateRegistrationResponseSchema = APIResponseSchema.extend({
  /** Assigned registration ID */
  registrationId: z.string(),
  /** Whether registration succeeded */
  success: z.boolean(),
  /** The processed registration data */
  registration: RegistrationSchema,
});

/** Type alias for validated RegistrationResponse */
export type CreateRegistrationResponse = z.output<
  typeof CreateRegistrationResponseSchema
>;
export type RegistrationResponse = CreateRegistrationResponse;
