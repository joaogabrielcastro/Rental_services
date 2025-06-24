import { Equipment } from "../entities/equip";
import { IBaseRepository } from "./base-repo";

export interface IEquipmentRepository
    extends IBaseRepository<Equipment, string> {
    findAvailable(): Promise<Equipment[]>;
}
