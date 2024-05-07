import { Keyboard } from "grammy";
import { EMainKeyaboard } from '../../../libs/keyboards/main-keyboard.enum'

export const startKeyboard = new Keyboard()
.text(EMainKeyaboard.START_GAME)
.text(EMainKeyaboard.INVITE_FRIENDS)
.row()
.text(EMainKeyaboard.LANGUAGE)
.text(EMainKeyaboard.DESCRIPTION)
.resized();