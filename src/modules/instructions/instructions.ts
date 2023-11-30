import { Composer, InlineKeyboard, Keyboard } from "grammy";
import { INSTRUCTIONS_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";

const linkModule = new Composer<ContextWithI18n>();

linkModule.command(INSTRUCTIONS_COMMAND, async (ctx) => {
    const keyboard = new InlineKeyboard()
    keyboard.text('Подключение MetaMask', '/connect_metamask').row()
    keyboard.text('Привязка аккаунта к Telegram', '/link_telegram_account')
    return ctx.reply('Инструкции', {
        reply_markup: keyboard,
    })
})

linkModule.command('connect_metamask', async (ctx) => {
    return ctx.reply('https://telegra.ph/Podklyuchenie-MetaMask-11-30');
})

linkModule.command('link_telegram_account', async (ctx) => {
    return ctx.reply('https://telegra.ph/Privyazka-akkaunta-k-Telegram-11-30');
})

export default linkModule;