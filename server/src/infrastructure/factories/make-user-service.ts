import { UserService } from "../../business/services/user-service";
import { HashAdapter } from "../adapters/hash-adapter";
import { PrismaUserRepository } from "../db/prisma/repositories/user-repo-prisma";

export const makeUserService = () => {
    const repository = new PrismaUserRepository();
    const hashAdapter = new HashAdapter();

    return new UserService(repository, hashAdapter);
};
