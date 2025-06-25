import { Equipment, Prisma } from "@prisma/client";
import { Equipment as EquipmentDomain } from "../../../../domain/entities/equip";

export class PrismaEquipmentMapper {
    static toPrisma(equipment: EquipmentDomain): Equipment {
        return {
            id: equipment.id,
            name: equipment.name,
            image: equipment.image,
            stock: equipment.stock,
            price: new Prisma.Decimal(Number(equipment.price.toFixed(2))),
            description: equipment.description,
            is_available: equipment.isAvailable,
        };
    }

    static toDomain(equipment: Equipment): EquipmentDomain {
        return new EquipmentDomain({
            ...equipment,
            price: equipment.price.toNumber(),
        });
    }
}
