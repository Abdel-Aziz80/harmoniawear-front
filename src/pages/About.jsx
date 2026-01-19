// src/pages/About.jsx
export default function About() {
  return (
    <main className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-harmonia-black">
            À propos d’HarmoniaWear
          </h1>
          <p className="mt-3 text-harmonia-mauve max-w-2xl mx-auto">
            Sport, lifestyle et modest fashion — pour toute la famille : femme, homme, enfant, maternité.
          </p>
        </section>

        {/* Histoire */}
        <section className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-harmonia-black mb-3">Notre histoire</h2>
          <p className="text-harmonia-mauve leading-relaxed">
            HarmoniaWear est née d’un besoin simple : concilier performance, élégance et confort au quotidien, 
            avec des pièces qui respectent chaque silhouette et chaque moment de vie. 
            Nous construisons une marque durable et accessible, pensée pour durer.
          </p>
        </section>

        {/* Valeurs */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {title: "Qualité", desc: "Matières sélectionnées, coupes maîtrisées, finitions soignées."},
            {title: "Confort", desc: "Des pièces qui bougent avec vous — sport & lifestyle."},
            {title: "Durabilité", desc: "Approche responsable, production raisonnée quand c’est possible."},
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <div className="text-3xl mb-2"> </div>
              <h3 className="text-xl font-semibold text-harmonia-black">{v.title}</h3>
              <p className="text-harmonia-mauve mt-1">{v.desc}</p>
            </div>
          ))}
        </section>

        {/* Engagements */}
        <section className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-harmonia-black mb-4">Nos engagements</h2>
          <ul className="list-disc pl-5 space-y-2 text-harmonia-mauve">
            <li>Tailles et coupes inclusives (femme, homme, enfant, maternité).</li>
            <li>Transparence sur les matières et l’entretien.</li>
            <li>Expérience client claire : retours, échanges, délais affichés.</li>
          </ul>
        </section>

        {/* Contact / CTA */}
        <section className="text-center">
          <p className="text-harmonia-mauve mb-4">
            Une question sur nos produits, les tailles ou les commandes ?
          </p>
          <a
            href="mailto:contact@harmoniawear.com"
            className="inline-block bg-harmonia-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-harmonia-red transition"
          >
            Nous contacter
          </a>
        </section>
      </div>
    </main>
  );
}