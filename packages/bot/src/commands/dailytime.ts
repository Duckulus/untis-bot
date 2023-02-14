import { Command } from "../core/command";
import { upsertUser } from "@jamal/db";
import { scheduleDailyTask } from "../core/daily";
import { whatsAppClient } from "../core/clients/whatsapp";
import { COMMAND_PREFIX } from "../utils/constants";

Command.create({
  name: "dailytime",
  execute: async (msg, args, user) => {
    if (!user) return;
    const timeString = args[0];
    if (!timeString) {
      await msg.reply(`Current time: ${user.hours
        .toString()
        .padStart(2, "0")}:${user.minutes
        .toString()
        .padStart(2, "0")}\n\nUse ${COMMAND_PREFIX}dailytime <time> to change.
      `);
      return;
    } else {
      const hoursAndMinutes = timeString.split(":");
      const hours = parseInt(timeString.split(":")[0]);
      const minutes = parseInt(timeString.split(":")[1]);
      if (
        hoursAndMinutes.length != 2 ||
        isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
      ) {
        await msg.reply("Invalid time String. Format: hours:minutes");
        return;
      }
      await upsertUser({
        number: user.number,
        hours: hours,
        minutes: minutes,
      });

      scheduleDailyTask(whatsAppClient, user, hours, minutes);
      await msg.reply("Daily time changed");
    }
  },
});
