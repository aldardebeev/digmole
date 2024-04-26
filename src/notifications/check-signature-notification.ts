import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";

export class CheckSignatureNotification {
    private readonly messageType = 'checkSignature';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        console.log(job.data)
        this.bot.api.sendMessage(job.data.chatId,  job.data.isValid ? 
            `Адрес ${job.data.address} успешно привязан. Теперь он будет использоваться для зачислений и отчислений в игре RODJack.` :
            `Неверная подпись`);
    }
}