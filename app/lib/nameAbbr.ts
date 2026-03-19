export function nameAbbr(name: string) {
  const abbrs = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return abbrs;
}

export function generateIcon(category: string) {
  switch (category) {
    case "Rent":
      return "🏠";
    case "Utilities":
      return "⚡";
    case "Food":
    case "Food & Groceries":
      return "🛒";
    case "Transport":
      return "🚗";
    case "Entertainment":
      return "🎬";
    case "Health":
      return "💊";
    default:
      return "🏦";
  }
}
