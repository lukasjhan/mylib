export const magicNumbers: Array<{ ext: string; signitures: number[] }> = [
  { ext: 'jpg', signitures: [0xff, 0xd8, 0xff] },
  { ext: 'png', signitures: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { ext: 'gif', signitures: [0x47, 0x49, 0x46] },
  { ext: 'bmp', signitures: [0x42, 0x4d] },
  { ext: 'tif', signitures: [0x49, 0x49, 0x2a, 0x00] },
];

export const magicStrings: Array<{ ext: string; signitures: string }> = [
  { ext: 'jpg', signitures: '/9j' },
  { ext: 'png', signitures: 'iVB' },
  { ext: 'bmp', signitures: 'Qk0' },
  { ext: 'tiff', signitures: 'SUk' },
  { ext: 'mp3', signitures: 'SUQ' },
  { ext: 'wav', signitures: 'Ukl' },
  { ext: 'flac', signitures: 'Zkx' },
  { ext: 'mp4', signitures: 'AAA' },
];

export function estimateImageExt(buffer: Buffer) {
  const view = new Uint8Array(buffer);

  for (const elem of magicNumbers) {
    const match = elem.signitures.every((sig, i) => sig === view[i]);
    if (match) {
      return elem.ext;
    }
  }
  return '';
};

export function estimateExtFromB64String(b64String: string) {
  for (const elem of magicStrings) {
    if (b64String.startsWith(elem.signitures)) {
      return elem.ext;
    }
  }
  return '';
};