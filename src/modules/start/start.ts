import { Composer } from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";
import { startKeyboard } from "./keyboards/start.keyboard";
import gameQueue from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum"
import { Queue } from 'bullmq';

const startModule = new Composer<ContextWithI18n>();

startModule.command(START_COMMAND, async (ctx) => {
    await ctx.reply('Отправьте адрес кошелька, который хотите привязать.\nАдрес должен начинаться с rod', {
        reply_markup: startKeyboard,
    });
    const job = await gameQueue(EQueue.START_BOT).add(randomUUID(), { chatId: ctx.chat.id, username: ctx.from?.username, extarnalWallet: "messageText" });
})


export default startModule;