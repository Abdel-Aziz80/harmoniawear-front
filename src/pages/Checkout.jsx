import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1>Fonctionnalité hors périmètre</h1>

      <p>
        Le module panier est présent afin de simuler un parcours utilisateur
        et illustrer la gestion d’état côté front-end.
      </p>

      <p>
        En revanche, le processus de commande et de paiement n’est pas inclus
        dans le périmètre pédagogique du projet HarmoniaWear (Titre DWWM).
      </p>

      <p>
        Cette page est volontairement désactivée.
      </p>
      <div className="space-x-4">
        <button className="bg-harmonia-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition"
          style={{ marginTop: "2rem", padding: "0.7rem 1.5rem" }}
          onClick={() => navigate("/")}
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
}