// Petits helpers génériques

// Concat classes Tailwind en ignorant les falsy
export const cn = (...parts) => parts.filter(Boolean).join(" ");

// Pause (utile pour des micro-démos/chargements)
export const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// Groupage d'objets par clé
export const groupBy = (arr = [], key) =>
  arr.reduce((acc, item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    (acc[k] ||= []).push(item);
    return acc;
  }, {});

// Pagination simple en mémoire
export const paginate = (arr = [], page = 1, perPage = 12) => {
  const start = (page - 1) * perPage;
  return {
    items: arr.slice(start, start + perPage),
    page,
    perPage,
    total: arr.length,
    pages: Math.max(1, Math.ceil(arr.length / perPage)),
  };
};

// Obtenir une query string propre
export const toQueryString = (obj = {}) =>
  new URLSearchParams(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();

// pick / omit pratiques
export const pick = (obj, keys = []) =>
  keys.reduce((o, k) => (k in obj ? { ...o, [k]: obj[k] } : o), {});

export const omit = (obj, keys = []) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
