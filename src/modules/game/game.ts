import { Composer } from "grammy";
import { COMMAND_PLAY_GAME } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";
import { config } from "../../config/config";
import { URL } from "url";

const gameModule = new Composer<ContextWithI18n>();

gameModule.on("callback_query:game_short_name", (ctx) => {
  const url = new URL(config.APP_GAME_CLIENT_URL);
  url.searchParams.append("userId", ctx.from.id.toString());
  url.searchParams.append("platform", "telegram");
  url.searchParams.append("authDateTime", new Date().getTime().toString());

  return ctx.answerCallbackQuery({
    url: url.toString(),
  });
});

gameModule.command(COMMAND_PLAY_GAME, (ctx) =>
  ctx.replyWithGame(config.APP_CCG_GAME_NAME, {})
);

export default gameModule;
