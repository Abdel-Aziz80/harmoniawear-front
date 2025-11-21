import { useState } from "react";
import { API } from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devUrl, setDevUrl] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setSent(true);
      // en dev, l’API peut renvoyer le lien direct
      if (data.devResetUrl) setDevUrl(data.devResetUrl);
    } catch (e) {
      setError(e.message);
    }
  }

  if (sent) {
    return (
      <div className="container mx-auto max-w-md py-10">
        <h1 className="text-2xl font-bold mb-4">Vérifie tes emails</h1>
        <p className="text-harmonia-mauve">
          Si un compte existe pour <b>{email}</b>, un lien de réinitialisation a été envoyé.
        </p>
        {devUrl && (
          <p className="mt-4 text-sm">
            (Dev) Lien direct :{" "}
            <a href={devUrl} className="text-harmonia-red underline">
              Réinitialiser maintenant
            </a>
          </p>
        )}
        <p className="mt-6">
          <Link to="/login" className="text-harmonia-red underline">Retour connexion</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold mb-6">Mot de passe oublié</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-harmonia-black text-white py-2 rounded-lg hover:bg-harmonia-red">
          Envoyer le lien
        </button>
      </form>
      <p className="mt-4 text-sm">
        <Link to="/login" className="text-harmonia-red underline">Retour connexion</Link>
      </p>
    </div>
  );
}
