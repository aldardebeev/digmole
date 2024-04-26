import { Composer } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { queueGame } from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";
import { EMainKeyaboard } from "../../libs/keyboards/main-keyboard.enum";
import { ECalbackQuery } from "../../libs/callback-query-enum";


const withdrawalModule = new Composer<CustomContext>();


async function askAmountWithdrawal(conversation: Conversation<CustomContext>, ctx: CustomContext) {
    await ctx.reply('Какую сумму хотите вывести?', {});

    const amount = await conversation.waitFor("message:text");
    
    if (ctx.chat && amount.message?.text) {
        conversation.external(async () => {
            await queueGame(EQueue.WITHDRAWAL).add(randomUUID(), { chatId: ctx.chat!.id, amount: amount.message?.text });
        });
    }
}

withdrawalModule.use(createConversation(askAmountWithdrawal))

withdrawalModule.callbackQuery(ECalbackQuery.WITHDRAWAL, async (ctx) => {
    await ctx.conversation.enter(askAmountWithdrawal.name);
    await ctx.answerCallbackQuery();
})

export default withdrawalModule;