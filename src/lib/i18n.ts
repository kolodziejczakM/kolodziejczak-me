export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const otherLocale = (locale: Locale): Locale =>
  locale === "pl" ? "en" : "pl";
export const text = (locale: Locale, pl: string, en: string): string =>
  locale === "pl" ? pl : en;
export const homePath = (locale: Locale): string => `/${locale}/`;
export const blogPath = (locale: Locale): string => `/${locale}/blog/`;
export function preferredLocale(browser: {
  languages?: readonly string[];
  language?: string;
}): Locale {
  const language = browser.languages?.[0] || browser.language || "";
  return language.toLowerCase().split("-")[0] === "pl" ? "pl" : "en";
}
export const categories = [
  "programming",
  "ai",
  "film",
  "books",
  "intersections",
  "other",
] as const;
export type Category = (typeof categories)[number];
export function categoryLabel(category: Category, locale: Locale): string {
  return {
    programming: text(locale, "Programowanie", "Programming"),
    ai: "AI",
    film: text(locale, "Film", "Film"),
    books: text(locale, "Książki", "Books"),
    intersections: text(locale, "Na styku", "At the intersection"),
    other: text(locale, "Poza kadrem", "Beyond the frame"),
  }[category];
}
export function formatReadingTime(seconds: number, locale: Locale): string {
  const minutes = Math.max(1, Math.ceil(seconds / 60));
  const form = new Intl.PluralRules(locale).select(minutes);
  let unit = minutes === 1 ? "minute" : "minutes";
  if (locale === "pl")
    unit = form === "one" ? "minuta" : form === "few" ? "minuty" : "minut";
  return `${minutes} ${unit}`;
}
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
export function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
