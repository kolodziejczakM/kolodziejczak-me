export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const otherLocale = (locale: Locale): Locale =>
  locale === "pl" ? "en" : "pl";
export const text = (locale: Locale, pl: string, en: string): string =>
  locale === "pl" ? pl : en;
export const homePath = (locale: Locale): string => `/${locale}/`;
export const blogPath = (locale: Locale): string => `/${locale}/blog/`;
export const categories = ["engineering", "web", "curiosity"] as const;
export type Category = (typeof categories)[number];
export function categoryLabel(category: Category, locale: Locale): string {
  return {
    engineering: text(locale, "Inżynieria", "Engineering"),
    web: text(locale, "Własny kawałek sieci", "The personal web"),
    curiosity: text(locale, "Poza kodem", "Beyond code"),
  }[category];
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
