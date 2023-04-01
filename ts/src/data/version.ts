interface Version {
  major: number;
  minor: number;
  patch: number;
}

export class SemanticVersion {
  public version: Version;
  constructor(version: string) {
    const [major, minor, patch] = version.split(".");
    this.version = {
      major: parseInt(major),
      minor: parseInt(minor),
      patch: parseInt(patch),
    };
  }

  public compare(other: SemanticVersion): number {
    return compareVersion(this.version, other.version);
  }

  static compare(v1: string, v2: string): number {
    return compareVersion(new SemanticVersion(v1).version, new SemanticVersion(v2).version);
  }
}

function compareVersion(v1: Version, v2: Version): number {
  if (v1.major !== v2.major) {
    return v1.major - v2.major;
  }

  if (v1.minor !== v2.minor) {
    return v1.minor - v2.minor;
  }
  
  if (v1.patch !== v2.patch) {
    return v1.patch - v2.patch;
  }

  return 0;
}