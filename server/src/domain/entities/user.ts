import { ulid } from "ulid";

export type UserRoles = "admin" | "user";

interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
}

export class User {
    readonly id: string;
    readonly role: UserRoles;
    name: string;
    email: string;
    password: string;

    constructor(props: IUser) {
        this.id = props.id || ulid();
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
    }
}
