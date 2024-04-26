import { Composer, InlineKeyboard } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { queueGame } from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum";
import {
    type Conversation,
    createConversation,
} from "@grammyjs/conversations";
import { ECalbackQuery } from "../../libs/callback-query-enum";

const rodRegExp = new RegExp(/rod/gmi);

const linkWalletModule = new Composer<CustomContext>();

async function askWallet(conversation: Conversation<CustomContext>, ctx: CustomContext) {
    console.log('Enter in conversation');

    await ctx.reply(' Отправьте адрес кошелька, который хотите привязать.\nАдрес должен начинаться с rod', {
    });

    const messageWithAddress = await conversation.waitForHears(rodRegExp);
    
    if (ctx.chat && messageWithAddress.message?.text) {
        conversation.external(async () => {
            await queueGame(EQueue.START_BOT).add(randomUUID(), { chatId: ctx.chat!.id, username: ctx.from?.username, address: messageWithAddress.message?.text });
        });
    }

    const messageWithSignature = await conversation.wait();
    await queueGame(EQueue.CHECK_SIGNATURE).add(randomUUID(), { chatId: ctx.chat!.id, signature: messageWithSignature.message?.text });
}

linkWalletModule.use(createConversation(askWallet))

linkWalletModule.callbackQuery(ECalbackQuery.LINK_WALLET, async ctx => {  
    await ctx.conversation.enter(askWallet.name);
    await ctx.answerCallbackQuery();
})

export default linkWalletModule;