import { Composer, InlineKeyboard } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { EMainKeyaboard } from "../../libs/keyboards/main-keyboard.enum";
import { queueGame } from "../queues/queues";
import { EQueue } from "../../libs/queues/queue.enum";
import { randomUUID } from "crypto";
import { ECalbackQuery } from "../../libs/callback-query-enum";

const walletModule = new Composer<CustomContext>();

walletModule.hears(EMainKeyaboard.INVITE_FRIENDS, async (ctx) => {
   await queueGame(EQueue.EXISTS_WALLET).add(randomUUID(), { chatId: ctx.chat!.id });
})

walletModule.callbackQuery(ECalbackQuery.BALANCE, async (ctx) => {
    await queueGame(EQueue.BALANCE).add(randomUUID(), { chatId: ctx.chat!.id });
    await ctx.answerCallbackQuery();
})


export default walletModule;