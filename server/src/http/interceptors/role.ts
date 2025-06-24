import { FastifyReply as Reply, FastifyRequest as Request } from "fastify";
import { UserRoles } from "../../domain/entities/user";

export const RoleInterceptor = (roles: UserRoles) => {
    return async (request: Request, reply: Reply) => {
        const user = request.user as { id: string; role: string };

        if (!roles.includes(user.role)) {
            return reply.status(401).send({ message: "Acess not authorized." });
        }
    };
};
