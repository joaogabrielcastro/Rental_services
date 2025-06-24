import { z } from "zod/v4";

export const authRequestSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export const authResponseSchema = z.object({
    token: z.string(),
});
