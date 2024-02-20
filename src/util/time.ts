import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import * as localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc.default);
dayjs.extend(timezone.default);
dayjs.extend(localizedFormat.default);

export function formatTime(input: string): string {
  return dayjs(input).format("LL");
}

export function formatTime2(input: string): string {
  return dayjs(input).format("LT");
}
