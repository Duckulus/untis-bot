import cron from "node-cron";
import { getAllUsers } from "@untis-bot/db";
import { Client } from "whatsapp-web.js";
import { COMMAND_PREFIX } from "./command";
import { Lesson, WebUntis } from "webuntis";
import { parseTimetable } from "../utils/timetable";
import { logger } from "@untis-bot/logger";

export const startDailyJob = (client: Client) => {
  cron.schedule("0 7 * * 1-5", async () => {
    logger.info("Running daily job");

    const users = await getAllUsers();
    for (let user of users) {
      const contact = await client.getNumberId(user.number);
      if (!user.subscribed || !contact) continue;

      const { untis_school, untis_username, untis_password, untis_eap } = user;

      if (
        !untis_school ||
        !untis_username ||
        !untis_password ||
        !untis_eap ||
        !user
      ) {
        await client.sendMessage(
          contact._serialized,
          `You are subscribed but there are no credentials associated with your account. Use ${COMMAND_PREFIX}unsubscribe to unsubscribe or ${COMMAND_PREFIX}untis to enter your credentials.`
        );
        continue;
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
        timetable = await untis.getOwnTimetableFor(new Date());
        await untis.logout();
      } catch (e) {
        await client.sendMessage(
          contact._serialized,
          "Error fetching Timetable. Please check your credentials."
        );
        continue;
      }

      let msg = "Daily Information\n\n";
      let eva = timetable.filter((l) => l.substText?.toLowerCase() == "eva");
      if (eva.length) {
        msg += "Heute hast du " + eva.length + " Stunden EvA:";
      } else {
        msg += "Heute hast du keine EvA :(";
      }
      msg += "\n";
      msg += parseTimetable(eva);
      if (
        timetable.filter(
          (l) =>
            l.su[0].longname.toLowerCase().includes("sport") &&
            l.substText?.toLowerCase() != "eva"
        ).length
      ) {
        msg += "\n\n";
        msg += "Sportsachen nicht vergessen!";
      }
      await client.sendMessage(contact._serialized, msg);
    }
  });
};
