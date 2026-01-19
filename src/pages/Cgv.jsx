import { Link } from "react-router-dom";

export default function CGV() {
  const lastUpdate = "05/01/2026";

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Conditions Générales de Vente (CGV)</h1>
          <p className="text-harmonia-mauve mt-2">Dernière mise à jour : {lastUpdate}</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Objet</h3>
          <p className="text-harmonia-mauve">
            Les présentes CGV régissent les ventes de produits réalisées par HarmoniaWear sur son site
            à des consommateurs situés en France et UE.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Produits</h3>
          <p className="text-harmonia-mauve">
            Les caractéristiques essentielles sont présentées sur la fiche produit. Les photos sont
            non contractuelles mais soignées pour refléter la réalité.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">3. Prix</h3>
          <p className="text-harmonia-mauve">
            Les prix sont indiqués en euros TTC (TVA applicable). Les frais de livraison sont
            précisés avant validation de la commande.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">4. Commande</h3>
          <p className="text-harmonia-mauve">
            La commande est ferme après confirmation de paiement. Un email récapitulatif est envoyé.
            Nous nous réservons le droit de refuser une commande anormale ou de mauvaise foi.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">5. Paiement</h3>
          <p className="text-harmonia-mauve">
            Paiement sécurisé (prestataire de paiement). Vos données de carte ne sont pas stockées chez nous.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">6. Livraison</h3>
          <p className="text-harmonia-mauve">
            Livraison à l’adresse indiquée, délais indiqués lors du checkout. Suivi fourni lorsque disponible.
            Les risques sont transférés à la remise au transporteur pour les pros, à la livraison pour les consommateurs.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">7. Droit de rétractation</h3>
          <p className="text-harmonia-mauve">
            Vous disposez de 14 jours calendaires à compter de la réception pour exercer votre droit de rétractation,
            sans motif. Les articles doivent être non portés, non lavés, avec étiquettes. Les retours sont à votre charge
            sauf erreur de notre part. Le remboursement intervient sous 14 jours après réception/contrôle.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">8. Retours & échanges</h3>
          <p className="text-harmonia-mauve">
            Procédure détaillée sur la page Retours. Contactez-nous avant tout envoi pour obtenir un numéro de retour.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">9. Garanties légales</h3>
          <ul className="list-disc pl-5 text-harmonia-mauve space-y-1">
            <li>Conformité (articles L217-3 et s. Code conso).</li>
            <li>Vices cachés (articles 1641 et s. Code civil).</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">10. Propriété intellectuelle</h3>
          <p className="text-harmonia-mauve">
            Marques, visuels et contenus appartiennent à HarmoniaWear/Devora. Toute reproduction non autorisée est interdite.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">11. Données personnelles</h3>
          <p className="text-harmonia-mauve">
            Voir notre <Link to="/privacy" className="underline">Politique de confidentialité</Link>.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">12. Médiation – Droit applicable</h3>
          <p className="text-harmonia-mauve">
            Droit français. En cas de litige, vous pouvez recourir à une médiation de la consommation (coordonnées à compléter),
            ou saisir les tribunaux compétents.
          </p>
        </section>

        <div className="mt-8">
          <Link to="/" className="underline">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
}
