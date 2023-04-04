from typing import TypedDict
from number import positive_modulo


class RGB(TypedDict):
    r: int
    g: int
    b: int


class RGBA(RGB):
    a: int


class HSL(TypedDict):
    h: int
    s: int
    l: int


class HSLA(HSL, RGBA):
    pass


class HSV(TypedDict):
    h: int
    s: int
    v: int


class HSVA(HSV, RGBA):
    pass


class CMYK(TypedDict):
    c: int
    m: int
    y: int
    k: int


class Color:
    def __init__(self, rgba: RGBA):
        self.rgba = rgba

    @staticmethod
    def from_hex(hex_val: str) -> "Color":
        hex_val = hex_val.replace("#", "")
        alpha_hex = hex_val[6:8]
        alpha = int(alpha_hex, 16) / 255 if alpha_hex else 1
        r = int(hex_val[0:2], 16)
        g = int(hex_val[2:4], 16)
        b = int(hex_val[4:6], 16)
        rgba = RGBA({"r": r, "g": g, "b": b, "a": alpha})
        return Color(rgba)

    @staticmethod
    def from_hsla(hsla):
        h = hsla["h"]
        s = hsla["s"] / 100
        l = hsla["l"] / 100
        sl = s * min(l, 1 - l)

        def cal(n):
            return (n + h / 30) % 12

        def convert(n):
            return l - sl * max(-1, min(cal(n) - 3, min(9 - cal(n), 1)))
        rgba = {
            "r": round(255 * convert(0)),
            "g": round(255 * convert(8)),
            "b": round(255 * convert(4)),
            "a": hsla["a"]
        }
        return Color(rgba)

    @staticmethod
    def from_hsva(hsva):
        h = hsva["h"]
        s = hsva["s"] / 100
        v = hsva["v"] / 100

        def cal(n):
            return (n + h / 60) % 6

        def convert(n):
            return v * (1 - s * max(0, min(cal(n), 4 - cal(n), 1)))
        rgba = {
            "r": round(255 * convert(5)),
            "g": round(255 * convert(3)),
            "b": round(255 * convert(1)),
            "a": hsva["a"]
        }
        return Color(rgba)

    def to_hex(self):
        r_hex = hex(self.rgba["r"])[2:].rjust(2, "0")
        g_hex = hex(self.rgba["g"])[2:].rjust(2, "0")
        b_hex = hex(self.rgba["b"])[2:].rjust(2, "0")
        alpha_hex = hex(round(self.rgba["a"] * 255))[2:].rjust(2, "0")
        hex_val = f"#{r_hex}{g_hex}{b_hex}{alpha_hex}"
        return hex_val

    def to_rgba_string(self):
        rgba = [self.rgba["r"], self.rgba["g"], self.rgba["b"], self.rgba["a"]]
        return f"rgba({','.join(map(str, rgba))})"

    def to_rgb_string(self):
        rgb = [self.rgba["r"], self.rgba["g"], self.rgba["b"]]
        return f"rgb({','.join(map(str, rgb))})"

    def to_hlsa(self) -> HSLA:
        r = self.rgba.r / 255
        g = self.rgba.g / 255
        b = self.rgba.b / 255

        cMax = max(r, g, b)
        cMin = min(r, g, b)
        delta = cMax - cMin

        hue = self.cal_hue(delta, cMax, r, g, b)

        lightness = (cMax + cMin) / 2
        saturation = 0 if delta == 0 else delta / (1 - abs(2 * lightness - 1))

        hsla: HSLA = {
            "h": hue,
            "s": saturation,
            "l": lightness,
            "a": self.rgba.a,
        }
        return hsla

    def to_hlva(self) -> HSVA:
        r = self.rgba.r / 255
        g = self.rgba.g / 255
        b = self.rgba.b / 255

        cMax = max(r, g, b)
        cMin = min(r, g, b)
        delta = cMax - cMin

        hue = self.cal_hue(delta, cMax, r, g, b)

        saturation = 0 if cMax == 0 else delta / cMax
        value = cMax

        hsva: HSVA = {
            "h": hue,
            "s": saturation,
            "v": value,
            "a": self.rgba.a,
        }
        return hsva

    def cal_hue(self, delta, c_max, r, g, b):
        if delta == 0:
            return 0
        h = 0
        if c_max == r:
            h = ((g - b) / delta) % 6
        elif c_max == g:
            h = (b - r) / delta + 2
        else:
            h = (r - g) / delta + 4
        h = round(h * 60)
        return h

    def to_hls_string(self):
        hsla = self.to_hlsa()
        return f"hsla({hsla['h']}, {hsla['s']}, {hsla['l']}, {hsla['a']})"

    def to_hsv_string(self):
        hsva = self.to_hlva()
        return f"hsva({hsva['h']}, {hsva['s']}, {hsva['v']}, {hsva['a']})"

    def rgba_to_cmyk(self):
        r = self.rgba.r / 255
        g = self.rgba.g / 255
        b = self.rgba.b / 255

        k = 1 - max(r, g, b)
        c = (1 - r - k) / (1 - k)
        m = (1 - g - k) / (1 - k)
        y = (1 - b - k) / (1 - k)

        cmyk = {
            "c": round(c * 100),
            "m": round(m * 100),
            "y": round(y * 100),
            "k": round(k * 100),
        }

        return cmyk

    def to_cmyk_string(self):
        cmyk = self.rgba_to_cmyk()
        c, m, y, k = cmyk.values()
        return f"cmyk({c}, {m}, {y}, {k})"

    def toGreyScale(self):
        r, g, b = self.rgba["r"], self.rgba["g"], self.rgba["b"]
        grey = round((r + g + b) / 3)
        greyScale = {"r": grey, "g": grey, "b": grey}
        return Color(greyScale)

    def lighten(self, l):
        hsla = self.to_hlsa()
        hsla["l"] = (hsla["l"] + l) % 100
        return Color.from_hsla(hsla)

    def darken(self, d):
        hsla = self.to_hlsa()
        hsla['l'] = positive_modulo(hsla['l'] - d, 100)
        return Color.from_hsla(hsla)

    def hue(self, value):
        hsva = self.to_hlva()
        hsva['h'] = positive_modulo(value, 360)
        return Color.from_hsva(hsva)

    def isEqual(self, color):
        return self.rgba == color.rgba

    def alpha(self):
        return self.rgba['a']
