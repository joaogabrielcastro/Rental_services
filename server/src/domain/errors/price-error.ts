import { AppError } from "../../shared/errors/app-error";

export class InvalidPriceError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}
