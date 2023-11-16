import { Composer } from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { ContextWithI18n } from "../../types/context-with-i18n";

const startModule = new Composer<ContextWithI18n>();

startModule.command(START_COMMAND, async (ctx) => {
    ctx.reply('Hello!')
})

export default startModule;