import { makeUserService } from "../../infrastructure/factories/make-user-service";
import { FastifyTypedInstance } from "../../shared/@/instance";
import { AuthInterceptor } from "../interceptors/auth";
import { userRequestSchema, userResponseSchema } from "../schemas/user-schemas";

export const UserRoutes = (app: FastifyTypedInstance) => {
    const userService = makeUserService();

    app.post(
        "/register",
        {
            schema: {
                tags: ["user"],
                body: userRequestSchema,
                response: {
                    201: userResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const user = await userService.createUser(request.body);
            return reply.status(201).send(user);
        },
    );

    app.get(
        "/me",
        {
            preHandler: [AuthInterceptor],
            schema: {
                tags: ["user"],
                response: {
                    200: userResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { sub } = request.user as { sub: string };
            const userId = sub;

            const user = await userService.findUser(userId);
            return reply.status(200).send(user);
        },
    );
};
