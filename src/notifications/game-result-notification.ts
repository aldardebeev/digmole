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
        const {
            creatorChatId, subcribeChatId, winner, creatorCardValue, subscribeCardValue,
            creatorCard1, creatorCard2, subscribeCard1, subscribeCard2
        } = job.data;

        if (winner === 'draw') {
            const winnerMessage = `Ничья\nСумма очков: ${creatorCardValue} = ${subscribeCardValue}`;
            await this.sendMessageToUser(creatorChatId, winnerMessage, creatorCardValue, subscribeCardValue, creatorCard1, creatorCard2, subscribeCard1, subscribeCard2);
            await this.sendMessageToUser(subcribeChatId, winnerMessage, subscribeCardValue, creatorCardValue, subscribeCard1, subscribeCard2, creatorCard1, creatorCard2);
        } else if (winner === 'creator'){
            await this.sendMessageToUser(creatorChatId, `Вы выиграли\nСумма очков: ${creatorCardValue} > ${subscribeCardValue}`, creatorCardValue, subscribeCardValue, creatorCard1, creatorCard2, subscribeCard1, subscribeCard2);
            await this.sendMessageToUser(subcribeChatId, `Вы проиграли\nСумма очков: ${subscribeCardValue} < ${creatorCardValue}`, subscribeCardValue, creatorCardValue, subscribeCard1, subscribeCard2, creatorCard1, creatorCard2);
        }else if (winner === 'subscribe'){
            await this.sendMessageToUser(creatorChatId, `Вы проиграли\nСумма очков: ${creatorCardValue} < ${subscribeCardValue}`, creatorCardValue, subscribeCardValue, creatorCard1, creatorCard2, subscribeCard1, subscribeCard2);
            await this.sendMessageToUser(subcribeChatId, `Вы выиграли\nСумма очков: ${subscribeCardValue} > ${creatorCardValue}`, subscribeCardValue, creatorCardValue, subscribeCard1, subscribeCard2, creatorCard1, creatorCard2);
        }
    }

    async sendMessageToUser(
        chatId: string, winnerMessage: string, userCardValue: number, botCardValue: number, myMove1: string, myMove2: string, opponentMove1: string, opponentMove2: string
    ) {
        await this.bot.api.sendMessage(chatId, 'Ваш ход');
        await this.bot.api.sendPhoto(chatId, `https://deckofcardsapi.com/static/img/${myMove1.replace("-", "")}.png`, { caption: `Выпала карта` });
        await this.bot.api.sendPhoto(chatId, `https://deckofcardsapi.com/static/img/${myMove2.replace("-", "")}.png`, { caption: 'Выпала карта' });

        await this.bot.api.sendMessage(chatId, 'Ход противника');
        await this.bot.api.sendPhoto(chatId, `https://deckofcardsapi.com/static/img/${opponentMove1.replace("-", "")}.png`, { caption: `Выпала карта` });
        await this.bot.api.sendPhoto(chatId, `https://deckofcardsapi.com/static/img/${opponentMove2.replace("-", "")}.png`, { caption: 'Выпала карта' });

        await this.bot.api.sendMessage(chatId, winnerMessage);
    }
}