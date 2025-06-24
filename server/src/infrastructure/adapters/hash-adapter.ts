import { compare, hash } from "bcrypt";

export interface IHashAdapter {
    hashData(data: string): Promise<string>;
    compareData(data: string, hash: string): Promise<boolean>;
}

// implementation
export class HashAdapter implements IHashAdapter {
    constructor(private salt: number = 10) {}

    async hashData(data: string): Promise<string> {
        return await hash(data, this.salt);
    }

    async compareData(data: string, hash: string): Promise<boolean> {
        return await compare(data, hash);
    }
}
