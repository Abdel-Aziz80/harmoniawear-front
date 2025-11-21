// src/services/api.js

/** @type {string} */
let API = "http://localhost:4000";
try {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) {
    API = import.meta.env.VITE_API_URL;
  } else if (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) {
    API = process.env.REACT_APP_API_URL; // fallback CRA
  }
} catch (_) {}
API = String(API).replace(/\/+$/, ""); // trim trailing slash

// -- token (stocké en localStorage)
const TOKEN_KEY = "HW_TOKEN";
let _token = null;

export function setAuthToken(t) {
  _token = t || null;
  try { localStorage.setItem(TOKEN_KEY, _token || ""); } catch {}
}
export function getAuthToken() {
  if (_token) return _token;
  try { _token = localStorage.getItem(TOKEN_KEY) || null; } catch {}
  return _token;
}

// -- helpers
function headers(extra = {}) {
  const h = { "Content-Type": "application/json", ...extra };
  const t = getAuthToken();
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}
async function handle(res) {
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText || "Erreur réseau";
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}
function url(path) {
  return `${API}${path.startsWith("/") ? path : `/${path}`}`;
}

// -- API
export async function apiGet(path) {
  const res = await fetch(url(path), { method: "GET", headers: headers() });
  return handle(res);
}
export async function apiPost(path, body) {
  const res = await fetch(url(path), { method: "POST", headers: headers(), body: JSON.stringify(body || {}) });
  return handle(res);
}
export async function apiPut(path, body) {
  const res = await fetch(url(path), { method: "PUT", headers: headers(), body: JSON.stringify(body || {}) });
  return handle(res);
}
export async function apiDel(path) {
  const res = await fetch(url(path), { method: "DELETE", headers: headers() });
  return handle(res);
}

// export aussi la base si besoin
export { API };
