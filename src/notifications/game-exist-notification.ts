import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";

export class GameExistNotification {
    private readonly messageType = 'gameExist';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        this.bot.api.sendMessage(job.data.chatId, `Уже создана игра со ставкой: ${job.data.amount} ROD`,);
    }
}