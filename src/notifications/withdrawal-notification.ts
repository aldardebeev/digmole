import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";

export class WithdrawalNotification {
    private readonly messageType = 'withdrawal';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        console.log(job.data)
        this.bot.api.sendMessage(job.data.chatId, `Вы успешно вывели ${job.data.amount} ROD.\n Ваш баланс ${job.data.balance} ROD`,);
    }
}