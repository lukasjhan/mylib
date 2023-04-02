import { InvalidUrlException } from "../exception/url";

export function isUrl(input: string): boolean {
  const matches = Url.parse(input);
  return !!matches;
}

export function getAllUrls(Content: string): string[] {
  const regex =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
  const urls = Content.match(regex);
  return urls ?? [];
}

export class Url {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  path: string;
  query: string;
  queryMap: Record<string, string>;
  fragment: string;

  static UrlRegex =
    /^((\w+):\/\/)?(([^:]+)(:(.+))?@)?([^\/:]+)(:(\d+))?([^?#]*)(\?([^#]*))?(\#(.*))?$/;

  static parse(urlString: string): RegExpMatchArray | null {
    return urlString.match(Url.UrlRegex);
  }

  constructor(urlString: string) {
    const matches = Url.parse(urlString);
    if (!matches) throw new InvalidUrlException(`Invalid URL ${urlString}`);

    this.protocol = matches[2] || "";
    this.username = matches[4] || "";
    this.password = matches[6] || "";
    this.hostname = matches[7] || "";
    this.port = matches[9] || "";
    this.path = matches[10] || "";
    this.query = matches[12] || "";
    this.queryMap = !this.query
      ? {}
      : this.query.split("&").reduce<Record<string, string>>((acc, param) => {
          const [key, value] = param.split("=");
          return { ...acc, [key]: value };
        }, {});
    this.fragment = matches[14] || "";
  }
}
