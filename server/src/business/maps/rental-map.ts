import { Equipment } from "../../domain/entities/equip";
import { Rental } from "../../domain/entities/rental";
import { RentalRequestDTO, RentalResponseDTO } from "../dtos/rental-dto";

export class RentalMapper {
    static toDomain(dto: RentalRequestDTO): Rental {
        return new Rental(dto);
    }

    static toResponse(rental: Rental, equipment: Equipment): RentalResponseDTO {
        return {
            id: rental.id,
            status: rental.status,
            amount: rental.amount,
            startDate: rental.startDate,
            returnDate: rental.returnDate,
            userId: rental.userId,
            equipment: { id: equipment.id, name: equipment.name },
        };
    }
}
