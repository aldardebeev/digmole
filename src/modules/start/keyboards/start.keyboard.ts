import { Keyboard } from "grammy";
import { EMainKeyaboard } from '../../../libs/keyboards/main-keyboard.enum'

export const startKeyboard = new Keyboard()
.text(EMainKeyaboard.CREATE_GAME)
.text(EMainKeyaboard.FIND_GAME)
.row()
.text(EMainKeyaboard.WALLET)
.text(EMainKeyaboard.RULE_GAME)
.resized();