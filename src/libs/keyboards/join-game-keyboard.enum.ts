import { InlineKeyboard } from "grammy";
import { ECalbackQuery } from "../callback-query-enum";

export const JoinGameKeyboard = new InlineKeyboard()
.text('Присоеденится к игре', ECalbackQuery.JOIN_GAME)
