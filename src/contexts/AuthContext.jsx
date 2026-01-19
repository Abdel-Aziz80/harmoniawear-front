// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken, getAuthToken } from "../services/api";

const STORAGE_USER_KEY = "HW_USER";
const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Au chargement : récup token & user du stockage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
      // si un token existait déjà, getAuthToken() le récupérera côté api.js
      getAuthToken();
    } catch {}
  }, []);

  const login = ({ user, token }) => {
    setAuthToken(token);
    setUser(user);
    try { localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user)); } catch {}
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    try { localStorage.removeItem(STORAGE_USER_KEY); } catch {}
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
