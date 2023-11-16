import { Composer } from "grammy";
import startModule from "./start/start";
import gameModule from "./game/game";
import { ContextWithI18n } from "../types/context-with-i18n";

export const modules: Composer<ContextWithI18n>[] = [
    startModule,
    gameModule,
];