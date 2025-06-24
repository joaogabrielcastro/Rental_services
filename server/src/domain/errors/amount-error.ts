import { AppError } from "../../shared/errors/app-error";

export class InvalidAmountError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}
