import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";

export class CreateGameNotification {
    private readonly messageType = 'createGame';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        this.bot.api.sendMessage(job.data.chatId, `Игра создалась с номером: ${job.data.gameTransaction.id}. Со ставкой ${job.data.gameTransaction.amount / 100} ROD`,);
    }
}