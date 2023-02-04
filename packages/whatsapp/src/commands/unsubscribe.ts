import { Command } from "../core/command";
import { setSubscribed } from "@untis-bot/db";

Command.create({
  name: "unsubscribe",
  description: "Unsubscribes from daily message",
  execute: async (msg, _args, user) => {
    if (!user) return;
    await setSubscribed(user.number, false);
    await msg.reply("You unsubscribed from the daily message");
  },
});
