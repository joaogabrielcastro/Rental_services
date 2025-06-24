import { schedule } from "node-cron";

export interface ICronAdapter {
    run(expression: string, func: () => Promise<void>): Promise<void>;
}

export class NodeCronAdapter implements ICronAdapter {
    async run(expression: string, func: () => Promise<void>): Promise<void> {
        schedule(expression, async () => {
            await func();
        });
    }
}
