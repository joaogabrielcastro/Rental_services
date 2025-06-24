import { FastifyInstance } from "fastify";

export interface ITokenAdapter {
    generate(data: string | object | Buffer): string;
}

// implementation
export class TokenAdapter implements ITokenAdapter {
    constructor(private app: FastifyInstance) {}

    generate(data: string | object | Buffer): string {
        return this.app.jwt.sign(data, { expiresIn: "1h" });
    }
}
