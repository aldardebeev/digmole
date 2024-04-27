import { Composer, InlineKeyboard } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { config } from "../../config/config";
import { URL } from "url";
import crypto, { randomUUID } from "crypto";
import { EMainKeyaboard } from "../../libs/keyboards/main-keyboard.enum"
import { queueGame } from "../queues/queues";
import { EQueue } from "../../libs/queues/queue.enum";
import { ECalbackQuery } from "../../libs/callback-query-enum";
import { ReGameKeyboard } from "../../libs/keyboards/re-game-keyboard.enum copy";
import { RuleGameText } from "../../libs/texts/rule-game-text";

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

gameModule.hears(EMainKeyaboard.START_GAME, async (ctx) => {
  await queueGame(EQueue.AVAILABLE_AMOUNT).add(randomUUID(), { chatId: ctx.chat!.id });
});

gameModule.callbackQuery('reGame', async (ctx) => {
  await queueGame(EQueue.AVAILABLE_AMOUNT).add(randomUUID(), { chatId: ctx.chat!.id });
  await ctx.answerCallbackQuery();
});

gameModule.hears(EMainKeyaboard.RULE_GAME, async (ctx) => {
  await ctx.reply(RuleGameText)
});

const callbackQueries = [
  ECalbackQuery.START_GAME100,
  ECalbackQuery.START_GAME500,
  ECalbackQuery.START_GAME1000,
  ECalbackQuery.START_GAME3000
];

gameModule.callbackQuery(callbackQueries, async (ctx) => {
  await queueGame(EQueue.START_GAME).add(randomUUID(), { chatId: ctx.chat!.id, amount: ctx.callbackQuery.data });
  await ctx.answerCallbackQuery({text: 'Игра началась!'});
});


export default gameModule;
