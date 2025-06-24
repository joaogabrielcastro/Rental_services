import { User } from "@prisma/client";
import { User as UserDomain } from "../../../../domain/entities/user";

export class PrismaUserMapper {
    static toPrisma(user: UserDomain): User {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }

    static toDomain(user: User): UserDomain {
        return new UserDomain(user);
    }
}
