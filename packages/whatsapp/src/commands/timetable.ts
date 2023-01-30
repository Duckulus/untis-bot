import { Command, COMMAND_PREFIX } from "../core/command";
import { Lesson, WebUntis } from "webuntis";
import { getDate, parseTimetable } from "../utils/timetable";

Command.create({
  name: "timetable",
  description: "shows your timetable",
  execute: async (msg, args, client, user) => {
    if (!user) {
      await msg.reply("User not found, please try again later");
      return;
    }

    const day = args[0];
    if (!day) {
      await msg.reply(
        "Usage: " +
          COMMAND_PREFIX +
          "timetable [today/monday/tuesday/wednesday/thursday/friday]"
      );
      return;
    }

    let date = getDate(day);

    const { untis_school, untis_username, untis_password, untis_eap } = user;

    if (
      !untis_school ||
      !untis_username ||
      !untis_password ||
      !untis_eap ||
      !user
    ) {
      await msg.reply(
        `Missing information. Use ${COMMAND_PREFIX}untis to enter your credentials.`
      );
      return;
    }

    let timetable: Lesson[];
    try {
      const untis = new WebUntis(
        untis_school,
        untis_username,
        untis_password,
        untis_eap
      );
      await untis.login();
      timetable = await untis.getOwnTimetableFor(date);
      await untis.logout();
    } catch (e) {
      await msg.reply(
        "Error fetching Timetable. Please check your credentials."
      );
      return;
    }
    await msg.reply(
      `Timetable for ${date.toDateString()}\n` + parseTimetable(timetable)
    );
  },
});
