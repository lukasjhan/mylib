export async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64String = buffer.toString("base64");
  return base64String;
}

export function base64ToBlob(
  base64String: string,
  type?: string
): Blob {
  const buffer = Buffer.from(base64String, "base64");
  const blob = new Blob([buffer], { type });
  return blob;
}
