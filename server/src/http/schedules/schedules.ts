import { NodeCronAdapter } from "../../infrastructure/adapters/cron-adapter";
import { makeRentalService } from "../../infrastructure/factories/make-rental-service";

const rentalService = makeRentalService();
const cron = new NodeCronAdapter();

export const schedules = () => {
    cron.run("0 0 * * *", async () => {
        await rentalService.finishOverdueRentals();
    });
};
