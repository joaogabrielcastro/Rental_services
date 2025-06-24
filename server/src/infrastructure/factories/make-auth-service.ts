import { FastifyInstance } from "fastify";
import { AuthService } from "../../business/services/auth-service";
import { HashAdapter } from "../adapters/hash-adapter";
import { TokenAdapter } from "../adapters/token-adapter";
import { PrismaUserRepository } from "../db/prisma/repositories/user-repo-prisma";

export const makeAuthService = (app: FastifyInstance) => {
    const repository = new PrismaUserRepository();
    const hashAdapter = new HashAdapter();
    const tokenAdapter = new TokenAdapter(app);

    return new AuthService(repository, hashAdapter, tokenAdapter);
};
