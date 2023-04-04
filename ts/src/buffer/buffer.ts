export async function blobToBase64(buffer: Buffer): Promise<string> {
  const base64String = buffer.toString("base64");
  return base64String;
}

export function base64ToBlob(base64String: string): Buffer {
  const buffer = Buffer.from(base64String, "base64");
  return buffer;
}
