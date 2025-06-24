import { z } from "zod/v4";

const UserRoles = z.enum(["admin", "user"]);

export const userRequestSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(3),
    role: UserRoles,
});

export const userResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role: UserRoles,
});
