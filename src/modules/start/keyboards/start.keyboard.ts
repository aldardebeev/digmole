import { Keyboard } from "grammy";

export const startKeyboard = new Keyboard()
.text('Начать игру')
.text('Пополнить кошелек')
.row()
.text('Правила игры')
.resized();