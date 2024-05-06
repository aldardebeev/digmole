import { Bot, Api, RawApi, InlineKeyboard } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";
import { ECalbackQuery } from "../libs/callback-query-enum";

export class GameListNotification {
    private readonly messageType = 'gameList';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        if (job.data.transactions.length === 0) {
            await this.bot.api.sendMessage(job.data.chatId, 'Пока нет свободных игр.');
            return; 
        }

        for (const transaction of job.data.transactions) {
            const JoinGameKeyboard = new InlineKeyboard().text(
                'Присоеденится к игре',
                'joinGame',
             );
            const message = `Номер игры: \"${transaction.id}\", Игрок: ${transaction.Wallet.user.username}, Ставка: ${transaction.amount / 100 }`;

        await this.bot.api.sendMessage(job.data.chatId, message, { 
            reply_markup: JoinGameKeyboard,

        });
    }
}
}