import { makeEquipmentService } from "../../infrastructure/factories/make-equip-service";
import { FastifyTypedInstance } from "../../shared/@/instance";
import { AuthInterceptor } from "../interceptors/auth";
import { RoleInterceptor } from "../interceptors/role";
import {
    equipmentListResponseSchema,
    equipmentRequestSchema,
    equipmentResponseSchema,
} from "../schemas/equip-schemas";

export const EquipmentRoutes = (app: FastifyTypedInstance) => {
    const equipmentService = makeEquipmentService();

    app.post(
        "/create",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("admin")],
            schema: {
                tags: ["equipment"],
                body: equipmentRequestSchema,
                response: {
                    201: equipmentResponseSchema.describe(
                        "Equipment created. Returns equipment details.",
                    ),
                },
            },
        },
        async (request, reply) => {
            const equipment = await equipmentService.createEquipment(
                request.body,
            );
            return reply.status(201).send(equipment);
        },
    );

    app.get(
        "/:id",
        {
            schema: {
                tags: ["equipment"],
                response: {
                    200: equipmentResponseSchema.describe(
                        "Equipment found. Returns equipment data.",
                    ),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params as { id: string };
            const equipment = await equipmentService.findEquipment(id);
            return reply.status(200).send(equipment);
        },
    );

    app.get(
        "/all",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("admin")],
            schema: {
                tags: ["equipment"],
                response: {
                    200: equipmentListResponseSchema.describe(
                        "Returns a list of all equipments registered.",
                    ),
                },
            },
        },
        async (request, reply) => {
            const equipments = await equipmentService.findAll();
            return reply.status(200).send(equipments);
        },
    );

    app.get(
        "/available",
        {
            schema: {
                tags: ["equipment"],
                response: {
                    200: equipmentListResponseSchema.describe(
                        "Returns all available equipments.",
                    ),
                },
            },
        },
        async (request, reply) => {
            const equipments = await equipmentService.findAvailable();
            return reply.status(200).send(equipments);
        },
    );

    app.delete(
        "/delete/:id",
        {
            preHandler: [AuthInterceptor, RoleInterceptor("admin")],
            schema: {
                tags: ["equipment"],
            },
        },
        async (request, reply) => {
            const { id } = request.params as { id: string };
            await equipmentService.delete(id);

            return reply.status(200).send({ message: "Equipment deleted!" });
        },
    );
};
