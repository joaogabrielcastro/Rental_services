import { IUserRepository } from "../../domain/repositories/user-repo";
import { IHashAdapter } from "../../infrastructure/adapters/hash-adapter";
import { ConflictError, NotFoundError } from "../../shared/errors/app-error";
import { UserRequestDTO, UserResponseDTO } from "../dtos/user-dto";
import { UserMapper as Mapper } from "../maps/user-map";

export class UserService {
    constructor(
        private repository: IUserRepository,
        private hashAdapter: IHashAdapter,
    ) {}

    async createUser(dto: UserRequestDTO): Promise<UserResponseDTO> {
        const user = await this.repository.findByEmail(dto.email);

        if (user) {
            throw new ConflictError("Email has already been registered.");
        }

        const hashPassword = await this.hashAdapter.hashData(dto.password);

        return Mapper.toResponse(
            await this.repository.save(
                Mapper.toDomain({ ...dto, password: hashPassword }),
            ),
        );
    }

    async findUser(userId: string): Promise<UserResponseDTO> {
        const user = await this.repository.findById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return Mapper.toResponse(user);
    }
}
