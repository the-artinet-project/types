/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod/v4";
import { JSONRPCResultResponseSchema } from "@modelcontextprotocol/sdk/types.js";
/**
 * @deprecated Use JSONRPCResultResponseSchema instead.
 * @description Represents a JSON-RPC 2.0 Success Response object.
 */
export const JSONRPCSuccessResponseSchema = JSONRPCResultResponseSchema;
/**
 * @deprecated Use JSONRPCResultResponse instead.
 * @description Represents a JSON-RPC 2.0 Success Response object.
 */
export type JSONRPCSuccessResponse = z.output<
  typeof JSONRPCSuccessResponseSchema
>;
