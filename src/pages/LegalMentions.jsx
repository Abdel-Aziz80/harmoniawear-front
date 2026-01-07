import { Link } from "react-router-dom";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Mentions légales</h1>
        </header>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Éditeur du site</h3>
          <p className="text-harmonia-mauve">
            SAS HarmoniaWear – 6 RUE D'ARMAILLE, 75017 PARIS, France. <br />
            Email : contact@harmoniawear.com – Code APE : 47.91B – N° SIREN : 943643353.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Directeur de la publication</h3>
          <p className="text-harmonia-mauve">A. Ayyad</p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Hébergeur</h3>
          <p className="text-harmonia-mauve">
            (À compléter : nom, adresse et contact de l’hébergeur ou de la plateforme).
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Propriété intellectuelle</h3>
          <p className="text-harmonia-mauve">
            L’ensemble des contenus du site (textes, images, marques, logos, design) est protégé. Toute
            reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Crédits</h3>
          <p className="text-harmonia-mauve">
            Site développé par DevOra. Certaines images peuvent provenir de banques d’images libres de droits.
          </p>
        </section>

        <div className="mt-8">
          <Link to="/" className="underline">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
}
