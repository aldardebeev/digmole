import { InlineKeyboard } from "grammy";
import { ECalbackQuery } from "../callback-query-enum";

export const notAwailableAmountKeyboard = new InlineKeyboard()
.text('Баланс', ECalbackQuery.BALANCE)