import { Composer } from "grammy";
import { COMMAND_PLAY_GAME } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";
import { config } from "../../config/config";

const gameModule = new Composer<ContextWithI18n>();

gameModule.on("callback_query:game_short_name", (ctx) =>
  ctx.answerCallbackQuery({
    url: config.APP_GAME_CLIENT_URL,
  })
);

gameModule.command(COMMAND_PLAY_GAME, (ctx) => ctx.replyWithGame(config.APP_CCG_GAME_NAME));

export default gameModule;
