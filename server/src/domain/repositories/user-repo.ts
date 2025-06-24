import { User } from "../entities/user";
import { IBaseRepository } from "./base-repo";

export interface IUserRepository extends IBaseRepository<User, string> {
    findByEmail(email: string): Promise<User | null>;
}
