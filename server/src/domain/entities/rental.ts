import { ulid } from "ulid";
import { InvalidAmountError } from "../errors/amount-error";
import { InvalidRentalDateError } from "../errors/rental-date-error";

export type RentalStatus = "active" | "finished" | "canceled";

interface IRental {
    id?: string;
    amount: number;
    startDate: Date;
    returnDate: Date;
    userId: string;
    equipmentId: string;
}

export class Rental {
    readonly id: string;
    readonly amount: number;
    readonly startDate: Date;
    readonly returnDate: Date;
    readonly userId: string;
    readonly equipmentId: string;
    private _status: RentalStatus;

    constructor(props: IRental) {
        this.id = props.id || ulid();
        this._status = "active";
        this.amount = props.amount;
        this.startDate = props.startDate;
        this.returnDate = props.returnDate;
        this.userId = props.userId;
        this.equipmentId = props.equipmentId;
    }

    get status() {
        return this._status;
    }

    finish(): void {
        this._status = "finished";
    }

    cancel(): void {
        this._status = "canceled";
    }

    public validateAmount(amount: number): void {
        if (amount < 1) {
            throw new InvalidAmountError("Amount must be greater than zero.");
        }
    }

    public validateDates(startDate: Date, returnDate: Date): void {
        const currentDate = new Date();

        if (startDate <= currentDate) {
            throw new InvalidRentalDateError(
                "Start date must be in the future, at least one day after current date.",
            );
        }

        if (returnDate <= startDate) {
            throw new InvalidRentalDateError(
                "Return date must be after start date, at least one day.",
            );
        }
    }
}
