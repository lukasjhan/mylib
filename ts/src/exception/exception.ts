export function stringifyException(e: any) {
  if (e === null) {
    return "null";
  }
  if (e === undefined) {
    return "undefined";
  }
  if (typeof e === "number") {
    return e.toString();
  }
  if (typeof e === "string") {
    return e;
  }

  return (
    (e.toString ? e.toString() : "") +
    JSON.stringify(
      e,
      typeof e === "object" ? Object.getOwnPropertyNames(e) : undefined
    )
  );
}
