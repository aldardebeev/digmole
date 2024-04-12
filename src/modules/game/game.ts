import { Composer } from "grammy";
import { ContextWithI18n } from "../../types/context-with-i18n";
import { config } from "../../config/config";
import { URL } from "url";
import crypto from "crypto";
import queueGame from "../queues/queues";
import { randomUUID } from "crypto";
import { EQueue } from "../../libs/queues/queue.enum"

const gameModule = new Composer<ContextWithI18n>();

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


gameModule.hears("Начать игру", async (ctx) => {
  const job = await queueGame(EQueue.START_GAME_SESSION).add(randomUUID(), { chatID: ctx.chat.id, amount: '12' });
  console.log(job)
});

export default gameModule;
