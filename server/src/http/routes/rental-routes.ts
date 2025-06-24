import { Transaction } from "../../infrastructure/db/prisma/transaction/prisma-transaction";
import { makeRentalService } from "../../infrastructure/factories/make-rental-service";
import { FastifyTypedInstance } from "../../shared/@/instance";
import { AuthInterceptor } from "../interceptors/auth";
import { RoleInterceptor } from "../interceptors/role";
import {
    rentalListResponseSchema,
    rentalRequestSchema,
    rentalResponseSchema,
} from "../schemas/rental-schemas";

export const RentalRoutes = (app: FastifyTypedInstance) => {
    const rentalService = makeRentalService();
    const transaction = new Transaction();

    app.post(
        "/rent",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("user")],
            schema: {
                tags: ["rental"],
                body: rentalRequestSchema,
                response: {
                    201: rentalResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { sub } = request.user as { sub: string };
            const userId = sub;

            const rental = await rentalService.rent({
                ...request.body,
                userId: userId,
            });

            return reply.status(201).send(rental);
        },
    );

    app.get(
        "/me",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("user")],
            schema: {
                tags: ["rental"],
                response: {
                    200: rentalListResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { sub } = request.user as { sub: string };
            const id = sub;

            const rentals = await rentalService.findUserRentals(id);
            return reply.status(200).send(rentals);
        },
    );

    app.get(
        "/all",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("admin")],
            schema: {
                tags: ["rental"],
                response: {
                    200: rentalListResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const rentals = await rentalService.findAll();
            return reply.status(200).send(rentals);
        },
    );

    app.get(
        "/cancel/:id",
        {
            preHandler: [AuthInterceptor],
            schema: {
                tags: ["rental"],
            },
        },
        async (request, reply) => {
            const { id } = request.params as { id: string };
            await rentalService.cancelRental(id);
            return reply.status(200).send({ message: "Rental canceled" });
        },
    );
};
