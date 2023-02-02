import { Lesson } from "webuntis";

export const parseTimetable = (timetable: Lesson[]): string => {
  return timetable
    .sort((a, b) => a.startTime - b.startTime)
    .map((lesson) => {
      return `${parseTime(lesson.startTime)}-${parseTime(lesson.endTime)} ${
        lesson.su[0].longname
      } ${lesson.te[0].longname} ${
        lesson.substText ? `(${lesson.substText})` : ""
      }`;
    })
    .join("\n");
};

const parseTime = (time: number): string => {
  const sTime = time.toString().padStart(4, "0");
  return [
    sTime.slice(0, sTime.length - 2),
    ":",
    sTime.slice(sTime.length - 2),
  ].join("");
};

export const getDate = (day: string) => {
  let date;
  if (day.toLowerCase() == "today") {
    date = new Date();
  } else if (day.toLowerCase() == "tomorrow") {
    date = new Date();
    date.setDate(date.getDate() + 1);
  } else {
    date = getNextDayOfTheWeek(day);
  }
  return date;
};

export const getNextDayOfTheWeek = (
  dayName: string,
  excludeToday = true,
  refDate = new Date()
): Date => {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return refDate;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate() +
      +excludeToday +
      ((dayOfWeek + 7 - refDate.getDay() - +excludeToday) % 7)
  );
  return refDate;
};
