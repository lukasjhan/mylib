import { positiveModulo } from "./number";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB, Alpha {}

export interface Alpha {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL, Alpha {}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface HSVA extends HSV, Alpha {}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export class Color {
  private rgba: RGBA;
  constructor(rgba: RGBA | RGB) {
    this.rgba = {
      r: rgba.r,
      g: rgba.g,
      b: rgba.b,
      a: "a" in rgba ? rgba.a : 1,
    };
  }

  static fromHex(hex: string): Color {
    hex = hex.replace(/^#/, "");

    const alphaHex = hex.substring(6, 2);
    const alpha = alphaHex ? parseInt(alphaHex, 16) / 255 : 1;

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 2), 16);
    const b = parseInt(hex.substring(4, 2), 16);

    const rgba: RGBA = { r, g, b, a: alpha };
    return new Color(rgba);
  }

  static fromHSL(hsla: HSLA): Color {
    const h = hsla.h;
    const s = hsla.s / 100;
    const l = hsla.l / 100;
    const sl = s * Math.min(l, 1 - l);

    const cal = (n: number) => (n + h / 30) % 12;
    const convert = (n: number) =>
      l - sl * Math.max(-1, Math.min(cal(n) - 3, Math.min(9 - cal(n), 1)));
    return new Color({
      r: Math.round(255 * convert(0)),
      g: Math.round(255 * convert(8)),
      b: Math.round(255 * convert(4)),
      a: hsla.a,
    });
  }

  static fromHSV(hsva: HSVA): Color {
    const h = hsva.h;
    const s = hsva.s / 100;
    const v = hsva.v / 100;

    const cal = (n: number) => (n + h / 60) % 6;
    const convert = (n: number) =>
      v * (1 - s * Math.max(0, Math.min(cal(n), 4 - cal(n), 1)));
    return new Color({
      r: Math.round(255 * convert(5)),
      g: Math.round(255 * convert(3)),
      b: Math.round(255 * convert(1)),
      a: hsva.a,
    });
  }

  public toHex(): string {
    const rHex = this.rgba.r.toString(16).padStart(2, "0");
    const gHex = this.rgba.g.toString(16).padStart(2, "0");
    const bHex = this.rgba.b.toString(16).padStart(2, "0");
    const alphaHex = Math.round(this.rgba.a * 255)
      .toString(16)
      .padStart(2, "0");
    const hex = `#${rHex}${gHex}${bHex}${alphaHex}`;
    return hex;
  }

  public toRGBAString(): string {
    const { r, g, b, a } = this.rgba;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  public toRGBString(): string {
    const { r, g, b } = this.rgba;
    return `rgb(${r}, ${g}, ${b})`;
  }

  public toHLSA(): HSLA {
    const r = this.rgba.r / 255;
    const g = this.rgba.g / 255;
    const b = this.rgba.b / 255;

    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;

    const hue = this.calHue(delta, cMax, r, g, b);

    const lightness = (cMax + cMin) / 2;
    const saturation =
      delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    const hsla: HSLA = {
      h: hue,
      s: saturation,
      l: lightness,
      a: this.rgba.a,
    };
    return hsla;
  }

  public toHLVA(): HSVA {
    const r = this.rgba.r / 255;
    const g = this.rgba.g / 255;
    const b = this.rgba.b / 255;

    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;

    const hue = this.calHue(delta, cMax, r, g, b);

    const saturation = cMax === 0 ? 0 : delta / cMax;
    const value = cMax;

    const hsva: HSVA = {
      h: hue,
      s: saturation,
      v: value,
      a: this.rgba.a,
    };
    return hsva;
  }

  private calHue(delta: number, cMax: number, r: number, g: number, b: number) {
    if (delta === 0) {
      return 0;
    }
    let h = 0;
    if (cMax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cMax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    return h;
  }

  public toHLSString(): string {
    const { h, s, l, a } = this.toHLSA();
    return `hsla(${h}, ${s}, ${l}, ${a})`;
  }

  public toHSVString(): string {
    const { h, s, v, a } = this.toHLVA();
    return `hsva(${h}, ${s}, ${v}, ${a})`;
  }

  public rgbaToCmyk(rgba: RGBA): CMYK {
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    const cmyk: CMYK = {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };

    return cmyk;
  }

  public toCMYKString(): string {
    const cmyk = this.rgbaToCmyk(this.rgba);
    const { c, m, y, k } = cmyk;
    return `cmyk(${c}, ${m}, ${y}, ${k})`;
  }

  public toGreyScale(): Color {
    const { r, g, b } = this.rgba;
    const grey = Math.round((r + g + b) / 3);
    const greyScale: RGB = { r: grey, g: grey, b: grey };
    return new Color(greyScale);
  }

  public lighten(l: number): Color {
    const hsla = this.toHLSA();
    hsla.l = positiveModulo(hsla.l + l, 100);
    return Color.fromHSL(hsla);
  }

  public darken(d: number): Color {
    const hsla = this.toHLSA();
    hsla.l = positiveModulo(hsla.l - d, 100);
    return Color.fromHSL(hsla);
  }

  public hue(value: number): Color {
    const hsva = this.toHLVA();
    hsva.h = positiveModulo(value, 360);
    return Color.fromHSV(hsva);
  }

  public isEqual(color: Color): boolean {
    return this.rgba.r === color.rgba.r &&
      this.rgba.g === color.rgba.g &&
      this.rgba.b === color.rgba.b &&
      this.rgba.a === color.rgba.a;
  }

  public alpha(): number {
    return this.rgba.a;
  }
}
