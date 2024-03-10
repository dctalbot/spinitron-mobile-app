import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import * as localizedFormat from "dayjs/plugin/localizedFormat";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type Day = (typeof DAYS)[number];

dayjs.extend(utc.default);
dayjs.extend(timezone.default);
dayjs.extend(localizedFormat.default);

export function formatTime(input: string): string {
  return dayjs(input).format("LL");
}

export function formatTime2(input: string): string {
  return dayjs(input).format("LT");
}

// export function startOfToday(): string {
//   return dayjs()
//     .tz(TIME_ZONE)
//     .set("h", 0)
//     .set("m", 0)
//     .set("s", 0)
//     .set("ms", 0)
//     .format();
// }

export function getToday(): Day {
  return dayjs().format("dddd") as Day;
}

export function getScheduleDayRange(day: Day): [string, string] {
  const offset = DAYS.indexOf(day);
  const start = dayjs()
    .add(1, "week")
    .startOf("week")
    .add(offset, "day")
    .add(6, "hour");
  const end = start.add(1, "day");
  return [start.format(), end.format()];
}
