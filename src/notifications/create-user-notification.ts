import { Bot, Api, RawApi } from "grammy";
import { CustomContext } from "../types/context-with-i18n";
import { NotificationWorker } from "../modules/worker/worker";
import { Job } from "bullmq";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";

export class CreateUserNotification {
    private readonly messageType = 'createUser';
    constructor(private readonly bot: Bot<CustomContext, Api<RawApi>>, private readonly notificationWorker: NotificationWorker) {
        notificationWorker.subscribe(this.messageType, this.handle.bind(this));
    }

    async handle(job: Job, conversation: Conversation<CustomContext>) {
        console.log(job.data);
        this.bot.api.sendMessage(job.data.chatId, 'Подтвердите, что это Ваш кошелек.\n' +
            '1. Скопируйте фразу для подписи в буфер обмена 👇\n' + 
            `${job.data.phrase}\n `+
            'нажмите чтобы скопировать 👆\n' +
            '2. В своем кошельке в UMI Wallet нажмите кнопку "Создать подпись"\n' +
            '3. Вставьте фразу для подписи из буфера обмена и сгенерируйте подпись\n' +
            '4. Отправьте подпись боту'), { parse_mode: "MarkdownV2" };
    }
}