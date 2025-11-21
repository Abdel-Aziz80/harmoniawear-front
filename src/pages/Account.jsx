// src/pages/Account.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { apiGet } from "../services/api";

export default function Account() {
  const { user, logout } = useAuth();

  // hooks TOUJOURS appelés au top (ordre constant)
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let off = false;
    // si pas d'utilisateur, on ne fait rien (évite l’appel pendant le logout)
    if (!user) { setLoading(false); return; }

    apiGet("/api/auth/me")
      .then((d) => { if (!off) setProfile(d?.user || user); })
      .catch(()   => { if (!off) setProfile(user); })
      .finally(() => { if (!off) setLoading(false); });

    return () => { off = true; };
  }, [user]);

  // après les hooks : redirection si déconnecté
  if (!user) return <Navigate to="/login" replace />;

  return (
    <main className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-harmonia-black mb-6">
          Mon compte
        </h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-6">Chargement…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Colonne gauche : résumé + logout */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="text-5xl mb-4">👤</div>
              <p className="text-sm text-harmonia-mauve mb-1">Connecté en tant que</p>
              <p className="font-semibold">{profile?.email}</p>
              <p className="text-xs mt-2 inline-block bg-black/5 px-2 py-1 rounded">
                {profile?.role || "CUSTOMER"}
              </p>
              <button
                onClick={logout}
                className="mt-6 w-full rounded-lg py-2 font-semibold text-white bg-harmonia-black hover:bg-harmonia-red transition"
              >
                Se déconnecter
              </button>
            </section>

            {/* Colonne droite : infos */}
            <section className="md:col-span-2 bg-white rounded-xl shadow p-6">
              {/* … ton contenu … */}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
