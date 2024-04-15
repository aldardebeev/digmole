import { Api, Bot, Composer, RawApi, Keyboard, session } from "grammy";
import { START_COMMAND } from "./utils/commands";
import { I18n } from "@grammyjs/i18n";
import { CustomContext } from "./types/context-with-i18n";
import { modules } from "./modules";
import { config } from "./config/config";
import { conversations } from "@grammyjs/conversations";
import { NotificationWorker } from "./modules/worker/worker";
import { redisOptions } from "./modules/queues/queues";
import { InvalidAddressNotification } from "./notifications/invalid-notification";

async function bootstrap() {
  const notificationWorker = new NotificationWorker(redisOptions);
  const bot = new Bot<CustomContext>(config.APP_BOT_TOKEN);

  const invalidAddressListenere = new InvalidAddressNotification(bot, notificationWorker);

  setupI18N(bot);
  setupSession(bot);
  setupConversations(bot);

  await setupCommands(bot);
  registerModules(bot, modules);

  bot.start();
  notificationWorker.start();
}

function setupI18N(bot: Bot<CustomContext, Api<RawApi>>) {
  const i18n = new I18n<CustomContext>({
    defaultLocale: "ru",
    directory: "dist/locales",
  });

  bot.use(i18n);

  console.log("Setup i18n");
}

function setupSession(bot: Bot<CustomContext, Api<RawApi>>) {
  bot.use(session({
    initial() {
      return {};
    },
  }));
}

function setupConversations(bot: Bot<CustomContext, Api<RawApi>>) {
  bot.use(conversations());
}

async function setupCommands(bot: Bot<CustomContext, Api<RawApi>>) {
  await bot.api.setMyCommands([
    { command: START_COMMAND, description: "Запустить бота" },
  ]);

  console.log("Setup commands");
}

async function registerModules(
  bot: Bot<CustomContext, Api<RawApi>>,
  modules: Composer<CustomContext>[]
) {
  modules.forEach((module) => {
    bot.use(module);
  });

  console.log(`Registered modules: ${modules.length}`);
}

bootstrap();
