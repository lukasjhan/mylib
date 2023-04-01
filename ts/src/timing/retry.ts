import { range } from "../range/range";
import { sleep } from "./timeout";

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number
): Promise<T> {
  for (const _ of range(retries - 1)) {
    try {
      const result = await fn();
      return result;
    } catch (err) {
      await sleep(500);
    }
  }
  return await fn();
}
