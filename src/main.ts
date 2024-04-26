import { Api, Bot, Composer, RawApi, Keyboard, session } from "grammy";
import { START_COMMAND } from "./utils/commands";
import { I18n } from "@grammyjs/i18n";
import { CustomContext } from "./types/context-with-i18n";
import { modules } from "./modules";
import { config } from "./config/config";
import { conversations } from "@grammyjs/conversations";
import { NotificationWorker } from "./modules/worker/worker";
import { InvalidAddressNotification } from "./notifications/invalid-notification";
import { CreateUserNotification } from "./notifications/create-user-notification";
import { RedisAdapter } from "@grammyjs/storage-redis";
import IORedis from "ioredis";
import { redisOptions } from "./modules/queues/queues";
import { CheckSignatureNotification } from "./notifications/check-signature-notification";
import { CheckLinkWalletNotification } from "./notifications/check-link-wallet";
import { BalanceNotification } from "./notifications/balance-notification";
import { CheckAvailableAmountNotification } from "./notifications/check-available-amount-notification";
import { NotEnoughTokensNotification } from "./notifications/not-enough-tokens-notification";
import { WithdrawalNotification } from "./notifications/withdrawal-notification";
import { GameResultNotification } from "./notifications/game-result-notification";


async function bootstrap() {
  const notificationWorker = new NotificationWorker(redisOptions);
  const bot = new Bot<CustomContext>(config.APP_BOT_TOKEN);

  const invalidAddressListenere = new InvalidAddressNotification(bot, notificationWorker);
  const createUserNotification = new CreateUserNotification(bot, notificationWorker);
  const checkSignatureNotification = new CheckSignatureNotification(bot, notificationWorker);
  const checkLinkWallet = new CheckLinkWalletNotification(bot, notificationWorker);
  const balance = new BalanceNotification(bot, notificationWorker);
  const checkAvailableAmountNotification = new CheckAvailableAmountNotification(bot, notificationWorker);
  const notEnoughTokensNotification = new NotEnoughTokensNotification(bot, notificationWorker);
  const withdarawalNotification = new WithdrawalNotification(bot, notificationWorker);
  const gameResultNotification = new GameResultNotification(bot, notificationWorker);
  
  setupI18N(bot);
  setupSession(bot, redisOptions);
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

function setupSession(bot: Bot<CustomContext, Api<RawApi>>, options: typeof redisOptions) {
  const redisInstance = new IORedis(options.port, options.host, {password: options.password, db: 3})
  const storage = new RedisAdapter({instance: redisInstance});

  bot.use(session({
    initial() {
      return {};
    },
    storage,
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
