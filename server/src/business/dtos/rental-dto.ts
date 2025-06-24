import { RentalStatus } from "../../domain/entities/rental";

// request dto
export interface RentalRequestDTO {
    amount: number;
    startDate: Date;
    returnDate: Date;
    userId: string;
    equipmentId: string;
}

// response dto
export interface RentalResponseDTO {
    id: string;
    status: RentalStatus;
    amount: number;
    startDate: Date;
    returnDate: Date;
    userId: string;
    equipment: {
        id: string;
        name: string;
    };
}
