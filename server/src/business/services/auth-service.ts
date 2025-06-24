import { IUserRepository } from "../../domain/repositories/user-repo";
import { IHashAdapter } from "../../infrastructure/adapters/hash-adapter";
import { ITokenAdapter } from "../../infrastructure/adapters/token-adapter";
import { UnauthorizedError } from "../../shared/errors/app-error";
import { AuthRequestDTO, AuthResponseDTO } from "../dtos/auth-dto";

export class AuthService {
    constructor(
        private repository: IUserRepository,
        private hashAdapter: IHashAdapter,
        private tokenAdapter: ITokenAdapter,
    ) {}

    async authenticate(dto: AuthRequestDTO): Promise<AuthResponseDTO> {
        const user = await this.repository.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const isPasswordValid = await this.hashAdapter.compareData(
            dto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials.");
        }

        const token = this.tokenAdapter.generate({
            sub: user.id,
            role: user.role,
        });

        return {
            token,
        };
    }
}
