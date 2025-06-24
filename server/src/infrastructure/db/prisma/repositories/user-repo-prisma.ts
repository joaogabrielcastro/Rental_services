import { User } from "../../../../domain/entities/user";
import { IUserRepository } from "../../../../domain/repositories/user-repo";
import { db } from "../client";
import { PrismaUserMapper as Mapper } from "../maps/user-map-prisma";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const raw = await db.user.findUnique({
            where: { email },
        });

        return raw ? Mapper.toDomain(raw) : null;
    }

    async save(entity: User, tx?: any): Promise<User> {
        const raw = await db.user.create({
            data: Mapper.toPrisma(entity),
        });

        return Mapper.toDomain(raw);
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string, tx?: any): Promise<User | null> {
        const raw = await db.user.findUnique({
            where: { id },
        });

        return raw ? Mapper.toDomain(raw) : null;
    }

    update(id: string, entity: User, tx?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
