export function nameAbbr(name: string) {
  const abbrs = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return abbrs;
}
