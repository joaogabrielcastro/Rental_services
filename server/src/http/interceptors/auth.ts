import { FastifyReply as Reply, FastifyRequest as Request } from "fastify";

export const AuthInterceptor = async (request: Request, reply: Reply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.status(401).send({ message: "Acess not authorized." });
    }
};
