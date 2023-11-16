import { Api, Bot, Composer, RawApi } from "grammy";
import { COMMAND_PLAY_GAME, START_COMMAND } from "./utils/commands";
import { I18n } from "@grammyjs/i18n";
import { ContextWithI18n } from "./types/context-with-i18n";
import { modules } from "./modules";
import { config } from "./config/config";

async function bootstrap() {
  const bot = new Bot<ContextWithI18n>(config.APP_BOT_TOKEN);

  setupI18N(bot);
  await setupCommands(bot);
  registerModules(bot, modules);

  console.log("Starting bot");

  bot.start();
}

function setupI18N(bot: Bot<ContextWithI18n, Api<RawApi>>) {
  const i18n = new I18n<ContextWithI18n>({
    defaultLocale: "ru",
    directory: "dist/locales",
  });

  bot.use(i18n);

  console.log("Setup i18n");
}

async function setupCommands(bot: Bot<ContextWithI18n, Api<RawApi>>) {
  await bot.api.setMyCommands([
    { command: START_COMMAND, description: "Start the bot" },
    { command: COMMAND_PLAY_GAME, description: "Play a game" },
  ]);

  console.log("Setup commands");
}

async function registerModules(
  bot: Bot<ContextWithI18n, Api<RawApi>>,
  modules: Composer<ContextWithI18n>[]
) {
  modules.forEach((module) => {
    bot.use(module);
  });

  console.log(`Registered modules: ${modules.length}`);
}

bootstrap();
