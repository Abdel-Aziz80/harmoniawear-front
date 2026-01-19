// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost, setAuthToken } from "../services/api";
import { useAuth } from "../contexts/AuthContext.jsx";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const strongPwd = (v) => v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);

export default function Register() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!isEmail(form.email)) return setErr("Email invalide.");
    if (!strongPwd(form.password)) return setErr("Mot de passe trop faible (8+ caractères avec lettres et chiffres).");
    if (form.password !== form.confirm) return setErr("Les mots de passe ne correspondent pas.");

    setLoading(true);
    try {
      const reg = await apiPost("/api/auth/register", {
        email: form.email,
        password: form.password,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        address: form.address || undefined,
      });

      if (reg?.token && reg?.user) {
        setAuthToken(reg.token);
        login({ user: reg.user, token: reg.token });
        return nav("/account", { replace: true });
      }

      const log = await apiPost("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      setAuthToken(log.token);
      login({ user: log.user, token: log.token });
      nav("/account", { replace: true });
    } catch (e2) {
      setErr(e2?.message || "Inscription impossible. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-harmonia-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-black/5 p-6">
        <h1 className="text-2xl font-montserrat font-bold text-harmonia-black text-center" data-testid="register-title">Créer un compte</h1>
        <p className="text-center text-harmonia-mauve mt-1">Rejoignez HarmoniaWear pour vos achats</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} autoComplete="on" noValidate data-testid="register-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="register-first" className="block text-sm mb-1">Prénom</label>
              <input
                id="register-first"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={onChange}
                data-testid="register-firstname-input"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
              />
            </div>
            <div>
              <label htmlFor="register-last" className="block text-sm mb-1">Nom</label>
              <input
                id="register-last"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={onChange}
                data-testid="register-lastname-input"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-email" className="block text-sm mb-1">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="vous@exemple.com"
              data-testid="register-email-input"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>

          <div>
            <label htmlFor="register-address" className="block text-sm mb-1">Adresse (optionnel)</label>
            <input
              id="register-address"
              name="address"
              type="text"
              autoComplete="street-address"
              value={form.address}
              onChange={onChange}
              data-testid="register-address-input"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="block text-sm mb-1">Mot de passe</label>
            <div className="relative">
              <input
                id="register-password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                data-testid="register-password-input"
                className="w-full border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-harmonia-red"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-70 hover:opacity-100"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Masquer" : "Afficher"}
                data-testid="toggle-password-visibility"
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="text-xs text-harmonia-mauve mt-1">8+ caractères, au moins une lettre et un chiffre.</p>
          </div>

          <div>
            <label htmlFor="register-confirm" className="block text-sm mb-1">Confirmer le mot de passe</label>
            <input
              id="register-confirm"
              name="confirm"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              required
              value={form.confirm}
              onChange={onChange}
              data-testid="register-confirm-input"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="••••••••"
            />
          </div>

          {err && <p className="text-red-600 text-sm" data-testid="register-error">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            data-testid="register-submit-btn"
            className={`w-full rounded-lg py-2 font-semibold text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-harmonia-black hover:bg-harmonia-red"}`}
          >
            {loading ? "Création en cours…" : "Créer mon compte"}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-harmonia-mauve">Déjà inscrit ? </span>
          <Link to="/login" className="text-harmonia-red underline" data-testid="login-link">Se connecter</Link>
        </div>
      </div>
    </main>
  );
}
