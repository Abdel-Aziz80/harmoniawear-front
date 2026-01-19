import { Link } from "react-router-dom";

export default function Privacy() {
  const lastUpdate = "05/01/2026"; // à tenir à jour

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité</h1>
          <p className="text-harmonia-mauve mt-2">Dernière mise à jour : {lastUpdate}</p>
        </header>

        {/* Sommaire */}
        <nav className="bg-white rounded-xl p-5 shadow mb-8">
          <h2 className="font-semibold mb-3">Sommaire</h2>
          <ul className="list-disc pl-5 grid gap-1 md:grid-cols-2">
            <li><a href="#donnees">1. Données que nous collectons</a></li>
            <li><a href="#bases">2. Bases légales</a></li>
            <li><a href="#finalites">3. Finalités</a></li>
            <li><a href="#cookies">4. Cookies</a></li>
            <li><a href="#durees">5. Durées de conservation</a></li>
            <li><a href="#destinataires">6. Destinataires & transferts</a></li>
            <li><a href="#securite">7. Sécurité</a></li>
            <li><a href="#droits">8. Vos droits RGPD</a></li>
            <li><a href="#contact">9. Contact</a></li>
            <li><a href="#modifs">10. Modifications</a></li>
          </ul>
        </nav>

        <section id="donnees" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Données que nous collectons</h3>
          <p className="text-harmonia-mauve">
            Création de compte (nom, prénom, email, adresse, téléphone), commandes (articles, prix,
            adresse de livraison/facturation), support client (contenu des échanges), données
            techniques (logs, navigateur, pages consultées), et préférences (tailles/couleurs).
          </p>
        </section>

        <section id="bases" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Bases légales</h3>
          <ul className="list-disc pl-5 text-harmonia-mauve space-y-1">
            <li>Exécution du contrat (gestion de commande, livraison, service client).</li>
            <li>Intérêt légitime (sécurisation, prévention de fraude, statistiques internes).</li>
            <li>Consentement (newsletter, cookies non essentiels).</li>
            <li>Obligations légales (comptabilité, garanties).</li>
          </ul>
        </section>

        <section id="finalites" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">3. Finalités</h3>
          <p className="text-harmonia-mauve">
            Vendre et livrer nos produits, gérer votre compte, personnaliser l’expérience,
            communiquer sur l’état des commandes, envoyer (si vous l’acceptez) des offres, mesurer l’audience
            et améliorer le site.
          </p>
        </section>

        <section id="cookies" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">4. Cookies</h3>
          <p className="text-harmonia-mauve mb-2">
            Nous utilisons des cookies techniques (connexion, panier), de mesure d’audience
            et, avec votre consentement, marketing. Vous pouvez gérer vos préférences à tout moment
            via le bandeau cookies ou les réglages du navigateur.
          </p>
          <ul className="list-disc pl-5 text-harmonia-mauve space-y-1">
            <li>Techniques/nécessaires : fonctionnement et sécurité du site.</li>
            <li>Mesure d’audience : statistiques anonymisées ou pseudonymisées.</li>
            <li>Marketing : personnalisation des offres (désactivables).</li>
          </ul>
        </section>

        <section id="durees" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">5. Durées de conservation</h3>
          <ul className="list-disc pl-5 text-harmonia-mauve space-y-1">
            <li>Compte inactif : 3 ans (puis suppression/anonymisation).</li>
            <li>Données de commande : durée légale (comptabilité & garanties).</li>
            <li>Prospection (email) : jusqu’au retrait du consentement.</li>
            <li>Cookies : selon leur nature (13 mois max pour audience).</li>
          </ul>
        </section>

        <section id="destinataires" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">6. Destinataires & transferts</h3>
          <p className="text-harmonia-mauve">
            Accès limité à nos équipes habilitées et à nos sous-traitants (hébergeur, paiement,
            logistique) dans le cadre strict des finalités. Les données sont hébergées dans l’UE.
            En cas de transfert hors UE, nous appliquons les garanties RGPD (clauses contractuelles types).
          </p>
        </section>

        <section id="securite" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">7. Sécurité</h3>
          <p className="text-harmonia-mauve">
            Mesures techniques et organisationnelles (chiffrement en transit, contrôle d’accès,
            sauvegardes, surveillance). Aucun système n’étant infaillible, signalez-nous tout incident suspect.
          </p>
        </section>

        <section id="droits" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">8. Vos droits RGPD</h3>
          <ul className="list-disc pl-5 text-harmonia-mauve space-y-1">
            <li>Accès, rectification, effacement, limitation, opposition, portabilité.</li>
            <li>Retrait du consentement à tout moment pour la prospection.</li>
            <li>Réclamation : CNIL (cnil.fr).</li>
          </ul>
        </section>

        <section id="contact" className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">9. Contact</h3>
          <p className="text-harmonia-mauve">
            SAS HarmoniaWear – contact@harmoniawear.com – 9 Rue Prévost, 76410 Saint-Aubin-lès-Elbeuf, France.
          </p>
        </section>

        <section id="modifs" className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">10. Modifications</h3>
          <p className="text-harmonia-mauve">
            Nous pouvons mettre à jour cette politique. La version en vigueur est celle publiée sur cette page.
          </p>
        </section>

        <div className="mt-8">
          <Link to="/" className="underline">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
}
