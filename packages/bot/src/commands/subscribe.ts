import { Command } from "../core/command";
import { setSubscribed } from "@jamal/db";

Command.create({
  name: "subscribe",
  description: "Subscribes to daily message",
  execute: async (msg, _args, _untis, user) => {
    if (!user) return;
    await setSubscribed(user.id, true);
    await msg.reply("You subscribed to the daily message");
  },
});
