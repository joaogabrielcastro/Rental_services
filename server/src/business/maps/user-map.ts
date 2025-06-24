import { User } from "../../domain/entities/user";
import { UserResponseDTO, UserRequestDTO } from "../dtos/user-dto";

export class UserMapper {
    static toDomain(dto: UserRequestDTO): User {
        return new User(dto);
    }

    static toResponse(user: User): UserResponseDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
}
