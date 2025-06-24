import { Prisma } from "@prisma/client";
import { ITransaction } from "../../../../business/interfaces/transaction";
import { db } from "../client";

export class Transaction implements ITransaction {
    run<T>(
        cb: (tx: Prisma.TransactionClient) => Promise<T>,
        parent?: Prisma.TransactionClient,
    ): Promise<T> {
        if (parent) {
            return cb(parent);
        }

        return db.$transaction(async (tx) => {
            return cb(tx);
        });
    }
}
