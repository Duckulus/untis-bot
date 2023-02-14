import cron from "node-cron";
import { getAllUsers, User } from "@jamal/db";
import { Client } from "whatsapp-web.js";
import { COMMAND_PREFIX } from "./command";
import { Lesson, WebUntis } from "webuntis";
import { parseTimetable } from "../utils/timetable";
import { logger } from "@jamal/logger";
import { FRONTEND_URL } from "@jamal/env";

const tasks: Map<string, cron.ScheduledTask> = new Map();

export const startDailyJob = async (client: Client) => {
  const users = await getAllUsers();
  for (let user of users) {
    scheduleDailyTask(client, user, user.hours, user.minutes);
  }
};

export const scheduleDailyTask = (
  client: Client,
  user: User,
  hours: number,
  minutes: number
) => {
  const task = tasks.get(user.number);
  if (task) {
    task.stop();
  }

  tasks.set(
    user.number,
    cron.schedule(`${minutes} ${hours} * * 1-5`, async () => {
      logger.info("Running daily job for " + user.number);
      const contact = await client.getNumberId(user.number.substring(1));

      if (!user.subscribed || !contact) return;

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
          `You are subscribed but there are no credentials associated with your account. Use ${COMMAND_PREFIX}unsubscribe to unsubscribe or consinder logging in at ${FRONTEND_URL}`
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
        timetable = await untis.getOwnTimetableFor(new Date());
        await untis.logout();
      } catch (e) {
        await client.sendMessage(
          contact._serialized,
          "Error fetching Timetable. Please check your credentials."
        );
        return;
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
    })
  );
};
