import { ulid } from "ulid";
import { InvalidAmountError } from "../errors/amount-error";

interface IEquipment {
    id?: string;
    name: string;
    image: string;
    stock: number;
    description: string;
}

export class Equipment {
    readonly id: string;
    name: string;
    image: string;
    description: string;
    private _stock!: number;
    private _isAvailable!: boolean;

    constructor(props: IEquipment) {
        this.id = props.id || ulid();
        this.name = props.name;
        this.image = props.image;
        this.stock = props.stock;
        this.description = props.description;
    }

    get isAvailable() {
        return this._isAvailable;
    }

    get stock() {
        return this._stock;
    }

    set stock(amount: number) {
        if (amount < 0) {
            throw new InvalidAmountError(
                "Amount must be greater or equal than zero.",
            );
        }

        if (!Number.isInteger(amount)) {
            throw new InvalidAmountError("Amount must be an integer.");
        }

        this._stock = amount;
        this._isAvailable = this._stock > 0 ? true : false;
    }

    decreaseAmount(amount: number): void {
        if (amount > this._stock) {
            throw new InvalidAmountError("Amount exceed stock available.");
        }

        this.stock = this._stock - amount;
    }

    increaseAmount(amount: number): void {
        this.stock = this._stock + amount;
    }
}
