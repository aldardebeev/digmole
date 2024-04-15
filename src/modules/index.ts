import { Composer } from "grammy";
import startModule from "./start/start";
import gameModule from "./game/game";
import { CustomContext } from "../types/context-with-i18n";
import linkModule from "./instructions/instructions";

export const modules: Composer<CustomContext>[] = [
    startModule,
    gameModule,
    linkModule,
];