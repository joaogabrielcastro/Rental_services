import { Prisma } from "@prisma/client";
import { Rental } from "../../../../domain/entities/rental";
import { IRentalRepository } from "../../../../domain/repositories/rental-repo";
import { db } from "../client";
import { PrismaRentalMapper as Mapper } from "../maps/rental-map-prisma";

export class PrismaRentalRepository implements IRentalRepository {
    async findByUser(userId: string): Promise<Rental[]> {
        const rentals = await db.rental.findMany({
            where: {
                userId: userId.trim(),
            },
        });
        return rentals.map(Mapper.toDomain);
    }

    async findByEquipment(equipmentId: string): Promise<Rental[]> {
        const rentals = await db.rental.findMany({
            where: {
                equipmentId: equipmentId.trim(),
            },
        });
        return rentals.map(Mapper.toDomain);
    }

    async findOverdueRentals(currentDate: Date): Promise<Rental[]> {
        const rentals = await db.rental.findMany({
            where: {
                status: "active",
                return_date: {
                    lt: currentDate,
                },
            },
        });

        return rentals.map(Mapper.toDomain);
    }

    async save(entity: Rental, tx?: Prisma.TransactionClient): Promise<Rental> {
        const invoker = tx ?? db;

        const rental = await invoker.rental.create({
            data: Mapper.toPrisma(entity),
        });

        return Mapper.toDomain(rental);
    }

    findAll(): Promise<Rental[]> {
        throw new Error("Method not implemented.");
    }

    async findById(
        id: string,
        tx?: Prisma.TransactionClient,
    ): Promise<Rental | null> {
        const invoker = tx ?? db;
        const raw = await invoker.rental.findUnique({ where: { id } });

        return raw ? Mapper.toDomain(raw) : null;
    }

    async update(
        id: string,
        entity: Rental,
        tx?: Prisma.TransactionClient,
    ): Promise<void> {
        const invoker = tx ?? db;
        const data = Mapper.toPrisma(entity);
        await invoker.rental.update({
            where: {
                id,
            },
            data,
        });
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
