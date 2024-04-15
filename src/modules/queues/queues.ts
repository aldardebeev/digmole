import { Worker, Queue, Job } from "bullmq";

export const redisOptions = {
  port: 6223,
  host: 'localhost',
  password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
  db: 2,
};

const queueGame = (queueTitle: string) => {
  return new Queue(queueTitle, {
    connection: redisOptions
  });
}

const bullMqNotificationListener = (queueTitle: string) => {
  return new Worker(queueTitle, async (job: Job) => {},  {
    connection: redisOptions
  });
}

export { bullMqNotificationListener, queueGame };

