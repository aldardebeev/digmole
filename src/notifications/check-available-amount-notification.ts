import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
} from "@grammyjs/conversations";
import { NotLinkWalletKeyboard } from "../libs/keyboards/not-link-wallet-keyboard.enum";
import { IsLinkWalletKeyboard } from "../libs/keyboards/is-link-wallet-keyboard.enum copy";
import { notLinkWalletGameText } from "../libs/texts/game/not-link-wallet-game-text copy";
import { notAvailableAmountText } from "../libs/texts/game/not-available-amount-text";
import { GameBetKeyboard } from "../libs/keyboards/game-bet-keyboard.enum";
import { notAwailableAmountKeyboard } from "../libs/keyboards/not-available-amount-keyboard.enum";
import { config } from "../config/config";

export class CheckAvailableAmountNotification {
    private readonly messageType = 'checkAvailableAmount';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        if (job.data.isLink) {
            if (job.data.availableAmount) {
                this.bot.api.sendMessage(job.data.chatId, "Выберите ставку", { reply_markup: GameBetKeyboard })
            } else {
                await this.bot.api.sendMessage(job.data.chatId, `Для запуска игры необходимо пополнить доступный баланс на 100 ROD
Для этого переведите токены ROD с вашего привязанного торгового адреса на следующий 👇:`,)
                await this.bot.api.sendMessage(job.data.chatId, config.HOT_ADDRESS)
                await this.bot.api.sendMessage(job.data.chatId, `🔴 ВНИМАНИЕ! переводите монеты только из привязанного кошелька UMI Wallet.
НЕ ПЕРЕВОДИТЕ монеты с биржи sigen.pro напрямую в игру`, { reply_markup: notAwailableAmountKeyboard })
            }

        } else {
            this.bot.api.sendMessage(job.data.chatId, notLinkWalletGameText, { reply_markup: NotLinkWalletKeyboard, });
        }

    }
}