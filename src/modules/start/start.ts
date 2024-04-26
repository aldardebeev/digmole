import { Composer } from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { CustomContext } from "../../types/context-with-i18n";
import { startKeyboard } from "./keyboards/start.keyboard";

const startModule = new Composer<CustomContext>();

startModule.command(START_COMMAND, async (ctx) => {
    await ctx.reply('Добро пожаловать в увлекательно простую игру на токене ROD.', {
        reply_markup: startKeyboard,
    });
})


export default startModule;