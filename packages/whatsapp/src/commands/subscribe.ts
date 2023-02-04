import { Command } from "../core/command";
import { setSubscribed } from "@untis-bot/db";

Command.create({
  name: "subscribe",
  description: "Subscribes to daily message",
  execute: async (msg, _args, user) => {
    if (!user) return;
    await setSubscribed(user.number, true);
    await msg.reply("You subscribed to the daily message");
  },
});
