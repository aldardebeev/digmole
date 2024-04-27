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
import { number } from "zod";


const withdrawalModule = new Composer<CustomContext>();


async function askAmountWithdrawal(conversation: Conversation<CustomContext>, ctx: CustomContext) {
    await ctx.reply('Какую сумму хотите вывести?', {});

    const amount = await conversation.waitFor("message:text");
    const numberAmount: number = +amount.message?.text;

    if (ctx.chat && amount.message?.text) {
        if( numberAmount <= 0){
            await ctx.reply('Вводите, только положительные числа', {});
        }else{
            conversation.external(async () => {
                await queueGame(EQueue.WITHDRAWAL).add(randomUUID(), { chatId: ctx.chat!.id, amount: amount.message?.text });
            });
        }
    }
}

withdrawalModule.use(createConversation(askAmountWithdrawal))

withdrawalModule.callbackQuery(ECalbackQuery.WITHDRAWAL, async (ctx) => {
    await ctx.conversation.enter(askAmountWithdrawal.name);
    await ctx.answerCallbackQuery();
})

withdrawalModule.callbackQuery(ECalbackQuery.INPUT, async (ctx) => {
    await ctx.reply('rod1d5we29rhpwmy5anrua3sdr78e7zhr38qav7yty7fjn3709j4kzvqt975em', {});
    await ctx.answerCallbackQuery();
})

export default withdrawalModule;