export default function Muslim() {
  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-4">
            COLLECTION MUSLIM
          </h1>
          <p className="text-harmonia-mauve text-lg max-w-2xl mx-auto">
            Élégance, pudeur et style contemporain. 
            Des pièces respectueuses de vos valeurs et tendances.
          </p>
        </section>

        {/* Publics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a href="#muslim-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition text-center p-6">
              <div className="w-20 h-20 bg-harmonia-mauve rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-harmonia-cream text-xl">👩</span>
              </div>
              <h3 className="font-montserrat font-bold text-harmonia-black mb-2">FEMME</h3>
              <p className="text-harmonia-mauve text-sm">Abayas, jilbabs, hijabs stylés</p>
            </div>
          </a>

          <a href="#muslim-homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition text-center p-6">
              <div className="w-20 h-20 bg-harmonia-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-harmonia-cream text-xl">👨</span>
              </div>
              <h3 className="font-montserrat font-bold text-harmonia-black mb-2">HOMME</h3>
              <p className="text-harmonia-mauve text-sm">Tenues modestes et élégantes</p>
            </div>
          </a>

          <a href="#muslim-enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition text-center p-6">
              <div className="w-20 h-20 bg-harmonia-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-harmonia-cream text-xl">🧒</span>
              </div>
              <h3 className="font-montserrat font-bold text-harmonia-black mb-2">ENFANT</h3>
              <p className="text-harmonia-mauve text-sm">Vêtements modestes kids</p>
            </div>
          </a>
        </div>

        {/* Valeurs */}
        <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-4">
            🌙 NOS VALEURS
          </h2>
          <p className="text-harmonia-mauve">
            Des matières de qualité, des coupes respectueuses et un style authentique 
            qui allient tradition et modernité.
          </p>
        </div>

      </div>
    </div>
  )
}