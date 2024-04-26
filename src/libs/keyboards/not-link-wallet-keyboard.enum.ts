import { InlineKeyboard } from "grammy";
import { ECalbackQuery } from "../callback-query-enum";

export const NotLinkWalletKeyboard = new InlineKeyboard()
.text('Привязать кошелек', ECalbackQuery.LINK_WALLET)