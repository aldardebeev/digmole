import { Composer, InlineKeyboard, Keyboard } from "grammy";
import { INSTRUCTIONS_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";

const linkModule = new Composer<ContextWithI18n>();

const connectMetamask = 'connect_metamask';
const linkTelegramAccount = 'link_telegram_account';

linkModule.command(INSTRUCTIONS_COMMAND, async (ctx) => {
    const keyboard = new InlineKeyboard()
    keyboard.text('Подключение MetaMask', connectMetamask).row()
    keyboard.text('Привязка аккаунта к Telegram', linkTelegramAccount)
    await ctx.reply('Инструкции', {
        reply_markup: keyboard,
    })
})

linkModule.callbackQuery(connectMetamask, async (ctx) => {
    await ctx.answerCallbackQuery('https://telegra.ph/Podklyuchenie-MetaMask-11-30');
})

linkModule.callbackQuery(linkTelegramAccount, async (ctx) => {
    await ctx.answerCallbackQuery('https://telegra.ph/Privyazka-akkaunta-k-Telegram-11-30');
})

export default linkModule;