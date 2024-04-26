import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";

export class GameResultNotification {
    private readonly messageType = 'gameResult';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        console.log(job.data)
        await this.bot.api.sendMessage(job.data.chatId, 'Ход Игрока');
        await this.bot.api.sendPhoto(job.data.chatId, `https://deckofcardsapi.com/static/img/${job.data.userCard1.replace("-", "")}.png`, { caption:  `Выпала карта` });
        await this.bot.api.sendPhoto(job.data.chatId, `https://deckofcardsapi.com/static/img/${job.data.userCard2.replace("-", "")}.png`, { caption: 'Выпала карта' });

        await this.bot.api.sendMessage(job.data.chatId, 'Ход Бота');
        await this.bot.api.sendPhoto(job.data.chatId, `https://deckofcardsapi.com/static/img/${job.data.botCard1.replace("-", "")}.png`, { caption:  `Выпала карта` });
        await this.bot.api.sendPhoto(job.data.chatId, `https://deckofcardsapi.com/static/img/${job.data.botCard2.replace("-", "")}.png`, { caption: 'Выпала карта' });

        const winnerMessage = job.data.winner === 'draw' ? 'Ничья' : job.data.winner === 'user' ? 'Вы выиграли' : 'Вы проиграли';
        await this.bot.api.sendMessage(job.data.chatId,winnerMessage);
    }
}