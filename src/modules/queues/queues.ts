import { Worker, Queue, Job } from "bullmq";
import { config } from "../../config/config";

export const redisOptions = {
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
  db: 2,
};

const queueGame = (queueTitle: string) => {
  return new Queue(queueTitle, {
    connection: redisOptions
  });
}

const bullMqNotificationListener = (queueTitle: string) => {
  return new Worker(queueTitle, async (job: Job) => { }, {
    connection: redisOptions
  });
}

export { bullMqNotificationListener, queueGame };

