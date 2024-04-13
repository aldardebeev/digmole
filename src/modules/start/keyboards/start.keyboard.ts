import { Keyboard } from "grammy";
import { EKeyaboard } from '../../../libs/keyboard.enum'

export const startKeyboard = new Keyboard()
.text(EKeyaboard.START_GAME)
.text(EKeyaboard.REPLISHMENT_WALLET)
.row()
.text(EKeyaboard.RULE_GAME)
.resized();