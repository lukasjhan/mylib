export const magicNumbers: Array<{ ext: string; sigs: number[] }> = [
  { ext: 'jpg', sigs: [0xff, 0xd8, 0xff] },
  { ext: 'png', sigs: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { ext: 'gif', sigs: [0x47, 0x49, 0x46] },
  { ext: 'bmp', sigs: [0x42, 0x4d] },
  { ext: 'tif', sigs: [0x49, 0x49, 0x2a, 0x00] },
];

export const magicStrings: Array<{ ext: string; sigs: string }> = [
  { ext: 'jpg', sigs: '/9j' },
  { ext: 'png', sigs: 'iVB' },
  { ext: 'bmp', sigs: 'Qk0' },
  { ext: 'tiff', sigs: 'SUk' },
  { ext: 'mp3', sigs: 'SUQ' },
  { ext: 'wav', sigs: 'Ukl' },
  { ext: 'flac', sigs: 'Zkx' },
  { ext: 'mp4', sigs: 'AAA' },
];

export function estimateImageExt(buffer: Buffer) {
  const view = new Uint8Array(buffer);

  for (const elem of magicNumbers) {
    const match = elem.sigs.every((sig, i) => sig === view[i]);
    if (match) {
      return elem.ext;
    }
  }
  return '';
};

export function estimateExtFromB64String(b64String: string) {
  for (const elem of magicStrings) {
    if (b64String.startsWith(elem.sigs)) {
      return elem.ext;
    }
  }
  return '';
};