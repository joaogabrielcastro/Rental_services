import { z } from "zod/v4";

const rentalEquipmentInfoSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const rentalRequestSchema = z.object({
    amount: z.int().min(1),
    startDate: z.coerce.date(),
    returnDate: z.coerce.date(),
    equipmentId: z.string(),
});

export const rentalResponseSchema = z.object({
    id: z.string(),
    amount: z.int().min(1),
    startDate: z.date(),
    returnDate: z.date(),
    userId: z.string(),
    equipment: rentalEquipmentInfoSchema,
});

export const rentalListResponseSchema = z.array(
    z.object({
        id: z.string(),
        amount: z.int().min(1),
        startDate: z.date(),
        returnDate: z.date(),
        userId: z.string(),
        equipment: rentalEquipmentInfoSchema,
    }),
);
