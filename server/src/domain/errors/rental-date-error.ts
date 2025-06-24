import { AppError } from "../../shared/errors/app-error";

export class InvalidRentalDateError extends AppError {
    constructor(message: string) {
        super(message, 422);
    }
}
