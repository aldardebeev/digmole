import { Worker } from 'bullmq';
import { EQueue } from "../../libs/queues/queue.enum"

const worker = new Worker(EQueue.NOTIFICATION, async job => {
      
});