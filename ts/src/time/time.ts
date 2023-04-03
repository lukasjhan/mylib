import { ONE_DAY_MS, ONE_HOUR_MS } from "./presets";

export function getDaysBetweenDates(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const daysDiff = Math.floor(timeDiff / ONE_DAY_MS);
  return daysDiff;
}

export function getHoursBetweenDates(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const hoursDiff = Math.ceil(timeDiff / ONE_HOUR_MS);
  return hoursDiff;
}
