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

export function getCompleteDate() {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  return formatted;
}

export function getMonth() {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  return formatted;
}

export function getPeriod() {
  const date = new Date();
  const hourOfTheDay = date.getHours();

  return hourOfTheDay < 12
    ? "Good Morning"
    : hourOfTheDay < 18
      ? "Good Afternoon"
      : "Good Evening";

  // if(hourOfTheDay < 12) {
  //   return 'Good Morning'
  // } else if (hourOfTheDay < 18 ) {
  //   return "Good Afternoon"
  // } else {
  //   return 'Good Evening'
  // }
}

export function getTime(date: Date) {
  const now = new Date(date);
  const time  = new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }).format(now);
  
  return time;
}
