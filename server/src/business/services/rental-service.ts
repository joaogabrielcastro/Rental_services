import { IEquipmentRepository } from "../../domain/repositories/equip-repo";
import { IRentalRepository } from "../../domain/repositories/rental-repo";
import { NotFoundError } from "../../shared/errors/app-error";
import { RentalRequestDTO, RentalResponseDTO } from "../dtos/rental-dto";
import { ITransaction } from "../interfaces/transaction";
import { RentalMapper as Mapper } from "../maps/rental-map";

export class RentalService {
    constructor(
        private equipmentRepository: IEquipmentRepository,
        private rentalRepository: IRentalRepository,
        private transaction: ITransaction,
    ) {}

    async rent(dto: RentalRequestDTO): Promise<RentalResponseDTO> {
        return await this.transaction.run(async (tx) => {
            const equipment = await this.equipmentRepository.findById(
                dto.equipmentId,
                tx,
            );

            if (!equipment) {
                throw new NotFoundError(
                    `Equipment ${dto.equipmentId} not found.`,
                );
            }

            equipment.decreaseAmount(dto.amount);
            await this.equipmentRepository.update(equipment.id, equipment, tx);

            const rental = Mapper.toDomain(dto);
            rental.validateDates(rental.startDate, rental.returnDate);
            rental.validateAmount(rental.amount);

            const result = await this.rentalRepository.save(rental, tx);

            return Mapper.toResponse(result, equipment!);
        });
    }

    async findUserRentals(userId: string): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findByUser(userId);

        return Promise.all(
            rentals.map(async (rental) => {
                const equipment = await this.equipmentRepository.findById(
                    rental.equipmentId,
                );
                return Mapper.toResponse(rental, equipment!);
            }),
        );
    }

    async findAll(): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findAll();

        return Promise.all(
            rentals.map(async (rental) => {
                const equipment = await this.equipmentRepository.findById(
                    rental.equipmentId,
                );
                return Mapper.toResponse(rental, equipment!);
            }),
        );
    }

    async finishOverdueRentals(): Promise<void> {
        const currentDate = new Date();
        const rentals =
            await this.rentalRepository.findOverdueRentals(currentDate);

        for (const rental of rentals) {
            await this.transaction.run(async (tx) => {
                // finish and cancel rental
                rental.finish();
                await this.rentalRepository.update(rental.id, rental);

                // find equipment and update stock
                const equipment = await this.equipmentRepository.findById(
                    rental.equipmentId,
                    tx,
                );

                equipment!.increaseAmount(rental.amount);
                await this.equipmentRepository.update(
                    equipment!.id,
                    equipment!,
                    tx,
                );
            });
        }
    }

    async cancelRental(rentalId: string): Promise<void> {
        await this.transaction.run(async (tx) => {
            const rental = await this.rentalRepository.findById(rentalId, tx);

            if (!rental) {
                throw new NotFoundError(`Rental ${rentalId} not found.`);
            }

            rental.cancel();
            await this.rentalRepository.update(rental.id, rental);

            const equipment = await this.equipmentRepository.findById(
                rental.equipmentId,
                tx,
            );
            equipment!.increaseAmount(rental.amount);

            await this.equipmentRepository.update(
                equipment!.id,
                equipment!,
                tx,
            );
        });
    }
}
