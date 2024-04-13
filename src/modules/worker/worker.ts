import { Worker } from "bullmq";
import { EQueue } from "../../libs/queues/queue.enum"
// Redis connection details
const workerConnectionOptions = {
    port: 6223,
    host: 'localhost',
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    db: 2,
};

const workerInstance = new Worker(EQueue.START_BOT, workerJobHandler, {
    connection: workerConnectionOptions,
});

// The `workerJobHandler` function is the function that will be called
// when a job is added to the queue. It will receive the job as an argument.
// The job will contain the data that was added to the queue when the job
// was created.
async function workerJobHandler(job) {
    console.log(`handling job: [${job.id}]`);
    console.log({ jobName: job.name, jobId: job.id, data: job.data });

    // for example:
    // await processUploadedFile(job.data.fileId)
    return;
}