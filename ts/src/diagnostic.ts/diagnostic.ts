import { getFileSizeString } from "../file/size";

export function getMemoryUsage() {
  const used = process.memoryUsage();
  return {
    rss: used.rss,
    heapTotal: used.heapTotal,
    heapUsed: used.heapUsed,
    external: used.external,
  }
}

export function getMemoryUsageString() {
  const used = process.memoryUsage();
  return {
    rss: getFileSizeString(used.rss),
    heapTotal: getFileSizeString(used.heapTotal),
    heapUsed: getFileSizeString(used.heapUsed),
    external: getFileSizeString(used.external),
  }
}