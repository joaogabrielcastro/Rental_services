import { Equipment } from "../../domain/entities/equip";
import {
    EquipmentListResponseDTO,
    EquipmentRequestDTO,
    EquipmentResponseDTO,
} from "../dtos/equip-dto";

export class EquipmentMapper {
    static toDomain(dto: EquipmentRequestDTO): Equipment {
        return new Equipment(dto);
    }

    static toResponse(equipment: Equipment): EquipmentResponseDTO {
        return {
            id: equipment.id,
            name: equipment.name,
            image: equipment.image,
            stock: equipment.stock,
            description: equipment.description,
            isAvailable: equipment.isAvailable,
        };
    }

    static toList(equipments: Equipment[]): EquipmentListResponseDTO[] {
        return equipments.map(({ id, name, image }) => ({
            id,
            name,
            image,
        }));
    }
}
