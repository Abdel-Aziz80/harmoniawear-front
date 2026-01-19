import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function ResetPassword() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const token = search.get("token") || "";

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("Mot de passe trop court (min 6).");
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");
    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      navigate("/login?reset=ok");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold mb-6">Réinitialiser le mot de passe</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {!token && (
          <p className="text-sm text-harmonia-mauve">
            Lien invalide. Demandez un nouveau lien depuis{" "}
            <Link to="/forgot-password" className="text-harmonia-red underline">Mot de passe oublié</Link>.
          </p>
        )}
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button disabled={!token} className="w-full bg-harmonia-black text-white py-2 rounded-lg hover:bg-harmonia-red disabled:opacity-50">
          Valider
        </button>
      </form>
    </div>
  );
}
