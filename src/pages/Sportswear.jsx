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
          <a href="#fitness" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">FITNESS</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Training & Gym</p>
              </div>
            </div>
          </a>

          <a href="#YOGA-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">YOGA</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Souplesse & Confort</p>
              </div>
            </div>
          </a>

          <a href="#VILLE-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">VILLE</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Sportswear urbain</p>
              </div>
            </div>
          </a>

          <a href="#RUNNING-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-r from-harmonia-black to-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">RUNNING</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Performance</p>
              </div>
            </div>
          </a>
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