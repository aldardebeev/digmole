import { Composer, InlineKeyboard } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { config } from "../../config/config";
import { URL } from "url";
import crypto from "crypto";
import { queueGame } from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum"
import { EKeyaboard } from "../../libs/keyboard.enum"

const gameModule = new Composer<CustomContext>();

gameModule.on("callback_query:game_short_name", (ctx) => {
  const url = new URL(config.APP_GAME_CLIENT_URL);

  url.searchParams.append("userId", ctx.from.id.toString());
  url.searchParams.append("platform", "telegram");
  url.searchParams.append("authDateTime", new Date().getTime().toString());

  const sortedParams = Array.from(url.searchParams.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((param) => param.join("="))
    .join("&");

  const hash = crypto
    .createHmac("sha256", config.APP_BOT_TOKEN)
    .update(sortedParams)
    .digest("hex");

  url.searchParams.append("hash", hash);

  console.log(ctx.from.id, url.toString());

  return ctx.answerCallbackQuery({
    url: url.toString(),
  });
});


gameModule.hears(EKeyaboard.START_GAME, async (ctx) => {
  const inlineKeyboard = new InlineKeyboard().text('100').text('200').row().text('300').text('400')
  await ctx.reply('Выберите ставку:', {
    reply_markup: inlineKeyboard
  });
});

gameModule.on('callback_query:data', async (ctx) => {
   const job = await queueGame(EQueue.START_GAME_SESSION).add(randomUUID(), { amount: ctx.callbackQuery.data });
   await ctx.answerCallbackQuery();
});

gameModule.hears(EKeyaboard.REPLISHMENT_WALLET, async (ctx) => {
  const job = await queueGame(EQueue.REPLISHMENT_WALLET).add(randomUUID(), { chatID: ctx.chat.id, amount: '12' });
});

gameModule.hears(EKeyaboard.RULE_GAME, async (ctx) => {
  await ctx.reply('Правила игры: \nБла Бла Бла...')
});
export default gameModule;
