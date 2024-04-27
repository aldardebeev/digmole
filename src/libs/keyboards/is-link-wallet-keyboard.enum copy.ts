import { InlineKeyboard } from "grammy";
import { ECalbackQuery } from "../callback-query-enum";

export const IsLinkWalletKeyboard = new InlineKeyboard()
.text('Баланс', ECalbackQuery.BALANCE)
.row()
.text('Вывод', ECalbackQuery.WITHDRAWAL)
.row()
.text('Ввод', ECalbackQuery.INPUT)