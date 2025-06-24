import { UserRoles } from "../../domain/entities/user";

// request data
export interface UserRequestDTO {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
}

// response data
export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: UserRoles;
}
