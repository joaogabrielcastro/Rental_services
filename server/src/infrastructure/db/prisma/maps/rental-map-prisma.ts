import { Rental } from "@prisma/client";
import { Rental as RentalDomain } from "../../../../domain/entities/rental";

export class PrismaRentalMapper {
    static toPrisma(rental: RentalDomain): Rental {
        return {
            id: rental.id,
            status: rental.status,
            amount: rental.amount,
            start_date: rental.startDate,
            return_date: rental.returnDate,
            userId: rental.userId,
            equipmentId: rental.equipmentId,
        };
    }

    static toDomain(rental: Rental): RentalDomain {
        return new RentalDomain({
            ...rental,
            startDate: rental.start_date,
            returnDate: rental.return_date,
        });
    }
}
