export default function Sportswear() {
  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-4">
            SPORTSWEAR
          </h1>
          <p className="text-harmonia-mauve text-lg max-w-2xl mx-auto">
            Confort, performance et style pour votre vie active. 
            Des pièces techniques qui s'adaptent à tous vos mouvements.
          </p>
        </section>

        {/* Activités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { name: 'FITNESS', desc: 'Training & Gym' },
            { name: 'YOGA', desc: 'Souplesse & Confort' },
            { name: 'VILLE', desc: 'Sportswear urbain' },
            { name: 'RUNNING', desc: 'Performance' }
          ].map((sport, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="text-2xl mb-3">{sport.name.split(' ')[0]}</div>
              <h3 className="font-montserrat font-bold text-harmonia-black mb-2">
                {sport.name.split(' ')[1]}
              </h3>
              <p className="text-harmonia-mauve text-sm">{sport.desc}</p>
            </div>
          ))}
        </div>

        {/* Maternity Sport */}
        <div className="bg-gradient-to-r from-harmonia-mauve to-harmonia-red rounded-2xl p-8 text-center text-harmonia-cream max-w-2xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold mb-4">
            SPORTSWEAR MATERNITY
          </h2>
          <p className="mb-4">
            Une collection spéciale conçue pour le confort des femmes enceintes 
            pendant leurs activités sportives.
          </p>
          <a 
            href="/maternity" 
            className="inline-block bg-harmonia-cream text-harmonia-black px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Découvrir
          </a>
        </div>

      </div>
    </div>
  )
}