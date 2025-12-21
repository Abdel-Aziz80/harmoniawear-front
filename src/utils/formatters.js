import { UI } from "./constants.js";

export const formatPrice = (value) =>
  new Intl.NumberFormat(UI.LOCALE, {
    style: "currency",
    currency: UI.CURRENCY,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const formatDate = (d) =>
  new Intl.DateTimeFormat(UI.LOCALE, {
    year: "numeric", month: "short", day: "2-digit",
  }).format(new Date(d));

export const labelCollection = (key) => ({
  streetwear: "Streetwear",
  sportswear: "Sportswear",
  maternity: "Maternity",
  muslim: "Muslim",
}[key] ?? key);

export const labelCategory = (key) => ({
  femme: "Femme",
  homme: "Homme",
  enfant: "Enfant",
}[key] ?? key);

export const titleCase = (s = "") =>
  s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());
