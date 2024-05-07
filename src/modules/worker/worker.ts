import { Job, RedisOptions, Worker } from "bullmq";
import { EQueue } from "../../libs/queues/queue.enum";

export class NotificationWorker {
    private readonly subscribersMap: Record<string, Function[]> = {};
    private worker?: Worker<any, any, string>;
    private redisOptions: RedisOptions;

    constructor(connectionOptions: RedisOptions) {
        this.redisOptions = connectionOptions;
    }

    private async handle(job: Job): Promise<void> {
        const callbacks = this.subscribersMap[job.data.messageType];
        for (const callback of callbacks) {
            await callback(job);
        }
    }

    public subscribe(messageType: string, callback: Function) {
        if (!this.subscribersMap[messageType]) {
            this.subscribersMap[messageType] = [];
        }

        this.subscribersMap[messageType].push(callback);
    }

    public start() {
        this.worker = new Worker(EQueue.NOTIFICATION, async (job: Job) => {
            this.handle(job);
        }, { connection: this.redisOptions });
    }
}