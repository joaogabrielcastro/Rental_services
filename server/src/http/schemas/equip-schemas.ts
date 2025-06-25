import { z } from "zod/v4";

export const equipmentRequestSchema = z.object({
    name: z.string(),
    image: z.string(),
    stock: z.number().int().min(0).default(1),
    price: z.number().min(0),
    description: z.string().max(255),
});

export const equipmentResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    stock: z.number().int().min(0).default(1),
    price: z.number().min(0),
    description: z.string().max(255),
    isAvailable: z.boolean(),
});

export const equipmentListResponseSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        price: z.number().min(0),
    }),
);
