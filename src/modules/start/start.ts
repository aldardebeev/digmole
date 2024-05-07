import { Composer, Keyboard } from "grammy";
import { START_COMMAND } from "../../utils/commands";
import { CustomContext } from "../../types/context-with-i18n";

const startModule = new Composer<CustomContext>();

startModule.command(START_COMMAND, async (ctx) => {
    const startKeyboard = new Keyboard()
        .text(ctx.t('button_start_game'))
        .text(ctx.t('button_invite'))
        .row()
        .text(ctx.t('button_description'))
        .resized();
        
    await ctx.reply(ctx.t('text_command_start'), {
        reply_markup: startKeyboard,
    });
})

export default startModule;