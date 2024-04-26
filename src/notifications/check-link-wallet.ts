import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";
import { NotLinkWalletText } from "../libs/texts/not-link-wallet-text";
import { NotLinkWalletKeyboard } from "../libs/keyboards/not-link-wallet-keyboard.enum";
import { IsLinkWalletKeyboard } from "../libs/keyboards/is-link-wallet-keyboard.enum copy";
import { isLinkWalletText } from "../libs/texts/is-link-wallet-text";

export class CheckLinkWalletNotification {
    private readonly messageType = 'checkLinkWallet';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        job.data.isLink 
        ? this.bot.api.sendMessage(job.data.chatId,  isLinkWalletText, {  reply_markup: IsLinkWalletKeyboard, }) 
        : this.bot.api.sendMessage(job.data.chatId,  NotLinkWalletText, {  reply_markup: NotLinkWalletKeyboard, });
    }
}