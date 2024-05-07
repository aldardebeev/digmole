import { Composer, InlineKeyboard } from "grammy";
import { CustomContext } from "../../types/context-with-i18n";
import { config } from "../../config/config";
import { URL } from "url";
import crypto, { randomUUID } from "crypto";
import { EMainKeyaboard } from "../../libs/keyboards/main-keyboard.enum"
import { queueGame } from "../queues/queues";
import { EQueue } from "../../libs/queues/queue.enum";
import { ECalbackQuery } from "../../libs/callback-query-enum";
import { RuleGameText } from "../../libs/texts/rule-game-text";

const gameModule = new Composer<CustomContext>();

gameModule.hears(EMainKeyaboard.LANGUAGE, async (ctx) => {
  await queueGame(EQueue.AVAILABLE_AMOUNT).add(randomUUID(), { chatId: ctx.chat!.id });
});

gameModule.hears(EMainKeyaboard.DESCRIPTION, async (ctx) => {
  ctx.reply(ctx.t('description'))
});
gameModule.on('message', async (ctx) => {
  console.log( ctx.message);
})
gameModule.hears(EMainKeyaboard.START_GAME, async (ctx) => {
  await ctx.reply(RuleGameText)
});

const callbackQueries = [
  ECalbackQuery.CREATE_GAME100,
  ECalbackQuery.CREATE_GAME500,
  ECalbackQuery.CREATE_GAME1000,
  ECalbackQuery.CREATE_GAME3000
];

gameModule.callbackQuery(callbackQueries, async (ctx) => {
  await queueGame(EQueue.CREATE_GAME).add(randomUUID(), { chatId: ctx.chat!.id, amount: ctx.callbackQuery.data });
  await ctx.answerCallbackQuery({ text: 'Игра создалась!' });
});


gameModule.callbackQuery('joinGame', async (ctx) => {
  const messageText = ctx.callbackQuery.message?.text;
  console.log(messageText);
  if (!messageText) {
    return;
  }
  const numbers = messageText.match(/\d+/g);
  if (!numbers || numbers.length === 0) {
    return;
  }
  
  const transactionId = parseInt(numbers[0]);

  console.log(transactionId);
  queueGame(EQueue.JOIN_GAME).add(randomUUID(), { chatId: ctx.chat!.id, transactionId: transactionId });
  await ctx.answerCallbackQuery();
});

export default gameModule;
