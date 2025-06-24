import { makeAuthService } from "../../infrastructure/factories/make-auth-service";
import { authRequestSchema, authResponseSchema } from "../schemas/auth-schemas";
import { FastifyTypedInstance } from "../../shared/@/instance";

export const AuthRoutes = (app: FastifyTypedInstance) => {
    const authService = makeAuthService(app);

    app.post(
        "/authenticate",
        {
            schema: {
                tags: ["user"],
                body: authRequestSchema,
                response: {
                    200: authResponseSchema.describe(
                        "Authentication successful. Returns acess token.",
                    ),
                },
            },
        },
        async (request, reply) => {
            const token = await authService.authenticate(request.body);
            return reply.status(200).send(token);
        },
    );
};
