import { Composer } from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { CustomContext } from "../../types/context-with-i18n";
import { startKeyboard } from "./keyboards/start.keyboard";
import { queueGame } from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";

const rodRegExp = new RegExp(/rod1/gmi);

const startModule = new Composer<CustomContext>();

async function askWallet(conversation: Conversation<CustomContext>, ctx: CustomContext) {
    await ctx.reply('Отправьте адрес кошелька, который хотите привязать.\nАдрес должен начинаться с rod', {
        reply_markup: startKeyboard,
    });

    const { msg: { text } } = await conversation.waitForHears(rodRegExp);

    if (ctx.chat && text) {
        const job = await queueGame(EQueue.START_BOT).add(randomUUID(), { chatId: ctx.chat.id, username: ctx.from?.username, address: text });
    }
}

startModule.use(createConversation(askWallet))

startModule.command(START_COMMAND, async (ctx) => {
    console.log('Logic for start command');
    await ctx.conversation.enter(askWallet.name);
})

export default startModule;