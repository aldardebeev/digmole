import { Composer } from "grammy";
import { LINK_TELEGRAM_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";

const linkModule = new Composer<ContextWithI18n>();

linkModule.command(LINK_TELEGRAM_COMMAND, async (ctx) => {
    ctx.reply(`Инструкция по привязке Telegram аккаунта к учётной записи на сайте: https://telegra.ph/Stan-chastyu-soobshchestva-UGIN-11-30`)
})

export default linkModule;