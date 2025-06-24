import { IEquipmentRepository } from "../../domain/repositories/equip-repo";
import { IRentalRepository } from "../../domain/repositories/rental-repo";
import { ConflictError, NotFoundError } from "../../shared/errors/app-error";
import {
    EquipmentListResponseDTO,
    EquipmentRequestDTO,
    EquipmentResponseDTO,
} from "../dtos/equip-dto";
import { EquipmentMapper as Mapper } from "../maps/equip-map";

export class EquipmentService {
    constructor(
        private repository: IEquipmentRepository,
        private rentalRepository: IRentalRepository,
    ) {}

    async createEquipment(
        dto: EquipmentRequestDTO,
    ): Promise<EquipmentResponseDTO> {
        return Mapper.toResponse(
            await this.repository.save(Mapper.toDomain(dto)),
        );
    }

    async findEquipment(equipmentId: string): Promise<EquipmentResponseDTO> {
        const equipment = await this.repository.findById(equipmentId);

        if (!equipment) {
            throw new NotFoundError(`Equipment ${equipmentId} not found.`);
        }

        return Mapper.toDomain(equipment);
    }

    async findAll(): Promise<EquipmentListResponseDTO[]> {
        const equipments = await this.repository.findAll();
        return Mapper.toList(equipments);
    }

    async findAvailable(): Promise<EquipmentListResponseDTO[]> {
        const equipments = await this.repository.findAvailable();
        return Mapper.toList(equipments);
    }

    async update(
        equipmentId: string,
        data: EquipmentRequestDTO,
    ): Promise<void> {
        await this.repository.update(equipmentId, Mapper.toDomain(data));
    }

    async delete(equipmentId: string): Promise<void> {
        const equipmentRentals =
            await this.rentalRepository.findByEquipment(equipmentId);

        if (equipmentRentals.length > 0) {
            throw new ConflictError("The equipmet has active rentals.");
        }

        await this.repository.delete(equipmentId);
    }
}
