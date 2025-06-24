import { Prisma } from "@prisma/client";
import { Equipment } from "../../../../domain/entities/equip";
import { IEquipmentRepository } from "../../../../domain/repositories/equip-repo";
import { db } from "../client";
import { PrismaEquipmentMapper as Mapper } from "../maps/equip-map-prisma";

export class PrismaEquipmentRepository implements IEquipmentRepository {
    async findAvailable(): Promise<Equipment[]> {
        const raws = await db.equipment.findMany();
        return raws.map(Mapper.toDomain);
    }

    async save(
        entity: Equipment,
        tx?: Prisma.TransactionClient,
    ): Promise<Equipment> {
        const invoker = tx ?? db;
        return Mapper.toDomain(
            await invoker.equipment.create({ data: Mapper.toPrisma(entity) }),
        );
    }

    async findAll(): Promise<Equipment[]> {
        const raws = await db.equipment.findMany();
        return raws.map(Mapper.toDomain);
    }

    async findById(
        id: string,
        tx?: Prisma.TransactionClient,
    ): Promise<Equipment | null> {
        const invoker = tx ?? db;
        const raw = await invoker.equipment.findUnique({ where: { id } });
        return raw ? Mapper.toDomain(raw) : null;
    }

    async update(
        id: string,
        entity: Equipment,
        tx?: Prisma.TransactionClient,
    ): Promise<void> {
        const invoker = tx ?? db;
        await invoker.equipment.update({
            where: {
                id,
            },
            data: Mapper.toPrisma(entity),
        });
    }

    async delete(id: string): Promise<void> {
        await db.equipment.delete({ where: { id } });
    }
}
