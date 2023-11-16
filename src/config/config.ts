import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  APP_BOT_TOKEN: z.string(),
  APP_GAME_CLIENT_URL: z.string().url(),
  APP_CCG_GAME_NAME: z.string(),
});


export type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse(process.env);
