import { EquipmentService } from "../../business/services/equip-service";
import { PrismaEquipmentRepository } from "../db/prisma/repositories/equip-repo-prisma";
import { PrismaRentalRepository } from "../db/prisma/repositories/rental-repo-prisma";

export const makeEquipmentService = () => {
    const repository = new PrismaEquipmentRepository();
    const rentalRepository = new PrismaRentalRepository();

    return new EquipmentService(repository, rentalRepository);
};
