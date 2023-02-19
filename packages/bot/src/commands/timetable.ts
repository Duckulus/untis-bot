import { Command } from "../core/command";
import { Lesson, WebUntis } from "webuntis";
import { getDate, parseTimetable } from "../utils/timetable";
import { FRONTEND_URL } from "@jamal/env";
import { COMMAND_PREFIX } from "../utils/constants";

Command.create({
  name: "timetable",
  description: "shows your timetable",
  execute: async (msg, args, untis, user) => {
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
    const { untis_school, untis_username, untis_password, untis_eap } = untis;

    if (
      !untis_school ||
      !untis_username ||
      !untis_password ||
      !untis_eap ||
      !user
    ) {
      await msg.reply(
        `Missing information. Consinder logging in at ${FRONTEND_URL}`
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
      await msg.reply("Error fetching Timetable.");
      return;
    }
    await msg.reply(
      `Timetable for ${date.toDateString()}\n` + parseTimetable(timetable)
    );
  },
});
