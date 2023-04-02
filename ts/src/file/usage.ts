import * as fs from "fs";
import * as path from "path";

export async function getDiskUsage(directory: string): Promise<number> {
  let totalUsage: number = 0;

  try {
    const stats = await fs.promises.stat(directory);
    if (stats.isFile()) {
      return stats.size;
    }

    const files = await fs.promises.readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      try {
        const fileStats = await fs.promises.stat(filePath);

        if (fileStats.isDirectory()) {
          const totalSubUsage = await getDiskUsage(filePath);
          totalUsage += totalSubUsage;
        } else {
          totalUsage += fileStats.size;
        }
      } catch (error) {}
    }
  } catch (error) {}

  return totalUsage;
}
