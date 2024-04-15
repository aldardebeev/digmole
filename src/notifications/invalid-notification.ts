import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";

export class InvalidAddressNotification {
    private readonly messageType = 'invalidAddress';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job) {
        console.log(job.data);
        this.bot.api.sendMessage(job.data.chatId, 'Неверный адрес, попробуйте еще раз');
    }
}