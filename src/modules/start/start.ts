import { Composer} from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";
import { startKeyboard } from "./keyboards/start.keyboard";

const startModule = new Composer<ContextWithI18n>();

startModule.command(START_COMMAND, async (ctx) => {
    
    await ctx.reply('Я бот JactTG, давай играть👇', {
        reply_markup: startKeyboard,
    });
})

export default startModule;