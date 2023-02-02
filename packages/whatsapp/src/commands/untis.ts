import { Command, COMMAND_PREFIX } from "../core/command";
import { upsertUser } from "db";
import { WebUntis } from "webuntis";

Command.create({
  name: "untis",
  description: "sets your untis credentials",
  execute: async (msg, args, user) => {
    const [untis_school, untis_username, untis_password] = args;
    if (!untis_school || !untis_username || !untis_password || !user) {
      await msg.reply(
        `Missing information. Usage: ${COMMAND_PREFIX}untis <school> <username> <password>`
      );
      return;
    } else {
      try {
        const untis = new WebUntis(
          untis_school,
          untis_username,
          untis_password,
          user.untis_eap
        );
        await untis.login();
        await untis.logout();
        await upsertUser({
          number: user.number,
          untis_school,
          untis_username,
          untis_password,
        });
        await msg.reply("Credentials Changed Successfully!");
      } catch (e) {
        await msg.reply("Invalid Credentials, please try again.");
      }
    }
  },
});
