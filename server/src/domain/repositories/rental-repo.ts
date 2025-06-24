import { Rental } from "../entities/rental";
import { IBaseRepository } from "./base-repo";

export interface IRentalRepository extends IBaseRepository<Rental, string> {
    findByUser(userId: string): Promise<Rental[]>;
    findByEquipment(equipmentId: string): Promise<Rental[]>;
    findOverdueRentals(currentDate: Date, tx?: any): Promise<Rental[]>;
}
