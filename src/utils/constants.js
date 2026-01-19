// Points d'entrée et valeurs “métier”
export const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:4000";

export const CATEGORIES = /** @type {const} */ ([
  "femme", "homme", "enfant",
]);

export const COLLECTIONS = /** @type {const} */ ([
  "streetwear", "sportswear", "maternity", "muslim",
]);

export const ROLES = /** @type {const} */ ({
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
});

export const UI = {
  SITE_NAME: "HarmoniaWear",
  CURRENCY: "EUR",
  LOCALE: "fr-FR",
};
