import { Command, COMMAND_PREFIX } from "../core/command";
import { upsertUser } from "db";
import { WebUntis } from "webuntis";

Command.create({
  name: "untis",
  description: "sets your untis credentials",
  execute: async (msg, args, client, user) => {
    const [untis_school, untis_username, untis_password, untis_eap] = args;
    if (
      !untis_school ||
      !untis_username ||
      !untis_password ||
      !untis_eap ||
      !user
    ) {
      await msg.reply(
        `Missing information. Usage: ${COMMAND_PREFIX}untis <school> <username> <password> <eap_url>`
      );
      return;
    } else {
      try {
        const untis = new WebUntis(
          untis_school,
          untis_username,
          untis_password,
          untis_eap
        );
        await untis.login();
        await untis.logout();
        await upsertUser({
          number: user.number,
          untis_school,
          untis_username,
          untis_password,
          untis_eap,
        });
        await msg.reply("Credentials Changed Successfully!");
      } catch (e) {
        await msg.reply("Invalid Credentials, please try again.");
      }
    }
  },
});
