import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./auth-routes";
import { UserRoutes } from "./user-routes";
import { EquipmentRoutes } from "./equip-routes";
import { RentalRoutes } from "./rental-routes";

export const Router = (app: FastifyInstance) => {
    app.register(AuthRoutes, { prefix: "/users" });
    app.register(UserRoutes, { prefix: "/users" });
    app.register(EquipmentRoutes, { prefix: "/equipments" });
    app.register(RentalRoutes, { prefix: "/rentals" });
};
