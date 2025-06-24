import { RentalService } from "../../business/services/rental-service";
import { PrismaEquipmentRepository } from "../db/prisma/repositories/equip-repo-prisma";
import { PrismaRentalRepository } from "../db/prisma/repositories/rental-repo-prisma";
import { Transaction } from "../db/prisma/transaction/prisma-transaction";

export const makeRentalService = () => {
    const equipmentRepository = new PrismaEquipmentRepository();
    const rentalRepository = new PrismaRentalRepository();
    const transaction = new Transaction();

    return new RentalService(equipmentRepository, rentalRepository, transaction);
};
