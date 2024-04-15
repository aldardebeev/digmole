import { Composer, InlineKeyboard, Keyboard } from "grammy";
import { INSTRUCTIONS_COMMAND } from "../../utils/commands";
import { CustomContext } from "../../types/context-with-i18n";
import { Menu } from "@grammyjs/menu";

const linkModule = new Composer<CustomContext>();

const connectMetamask = 'connect_metamask';
const linkTelegramAccount = 'link_telegram_account';

const menu = new Menu("instructions-menu")
.text("Подключение MetaMask", (ctx) => ctx.reply("https://telegra.ph/Podklyuchenie-MetaMask-11-30")).row()
.text("Привязка аккаунта к Telegram", (ctx) => ctx.reply("https://telegra.ph/Privyazka-akkaunta-k-Telegram-11-30"));

linkModule.use(menu);

linkModule.command(INSTRUCTIONS_COMMAND, async (ctx) => {
    await ctx.reply('Инструкции: ', {
        reply_markup: menu,
    })
})

export default linkModule;
