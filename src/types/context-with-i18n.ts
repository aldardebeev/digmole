import { ConversationFlavor } from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";

export type CustomContext = Context & I18nFlavor & SessionFlavor<{}> & ConversationFlavor;
