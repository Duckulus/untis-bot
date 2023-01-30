import { Command } from "../core/command";
import { setSubscribed } from "db";

Command.create({
  name: "unsubscribe",
  description: "Unsubscribes from daily message",
  execute: async (msg, args, client, user) => {
    if (!user) return;
    await setSubscribed(user.number, false);
    await msg.reply("You unsubscribed from the daily message");
  },
});
