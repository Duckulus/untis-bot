import { Command } from "../core/command";
import { setSubscribed } from "db";

Command.create({
  name: "subscribe",
  description: "Subscribes to daily message",
  execute: async (msg, args, client, user) => {
    if (!user) return;
    await setSubscribed(user.number, true);
    await msg.reply("You subscribed to the daily message");
  },
});
