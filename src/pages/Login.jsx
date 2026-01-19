// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../services/api";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await apiPost("/api/auth/login", { email, password });
      if (!data?.token || !data?.user) throw new Error("Réponse inattendue du serveur");
      login({ user: data.user, token: data.token });
      nav("/", { replace: true });
    } catch (e) {
      setErr(e?.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-harmonia-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-black/5 p-6">
        <h1 className="text-2xl font-montserrat font-bold text-harmonia-black text-center" data-testid="login-title">
          Connexion
        </h1>
        <p className="text-center text-harmonia-mauve mt-1">Accédez à votre compte HarmoniaWear</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} autoComplete="on" noValidate data-testid="login-form">
          <div>
            <label htmlFor="login-email" className="block text-sm mb-1">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              data-testid="login-email-input"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm mb-1">Mot de passe</label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                data-testid="login-password-input"
                className="w-full border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-harmonia-red"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-70 hover:opacity-100"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                data-testid="toggle-password-visibility"
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {err && <p className="text-red-600 text-sm" data-testid="login-error">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            data-testid="login-submit-btn"
            className={`w-full rounded-lg py-2 font-semibold text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-harmonia-black hover:bg-harmonia-red"}`}
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>

          <p className="mt-3 text-sm text-center">
            <Link to="/forgot-password" className="text-harmonia-red hover:underline" data-testid="forgot-password-link">
              Mot de passe oublié ?
            </Link>
          </p>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-harmonia-mauve">Pas encore de compte ? </span>
          <Link to="/register" className="text-harmonia-red underline" data-testid="register-link">Créer un compte</Link>
        </div>
      </div>
    </main>
  );
}
