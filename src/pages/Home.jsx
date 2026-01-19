export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-harmonia-black to-harmonia-mauve text-harmonia-cream py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
            HARMONIA<span className="text-harmonia-red">WEAR</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Style urbain pour toute la famille. 
            Découvrez nos collections homme, femme, enfant et nos lignes spécialisées.
          </p>
          <div className="space-x-4">
            <button className="bg-harmonia-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition">
              Découvrir les collections
            </button>
            <button className="border-2 border-harmonia-cream text-harmonia-cream px-8 py-4 rounded-lg font-semibold text-lg hover:bg-harmonia-cream hover:text-harmonia-black transition">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Catégories Principales - Homme, Femme, Enfant */}
      <section className="py-16 bg-harmonia-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center text-harmonia-black mb-12">
            POUR TOUTE LA FAMILLE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Femme */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-64 bg-gradient-to-br from-harmonia-mauve to-harmonia-red flex items-center justify-center">
                <span className="text-harmonia-cream text-2xl font-montserrat font-bold">FEMME</span>
              </div>
              <div className="p-6">
                <p className="text-harmonia-black">
                  Collections complètes pour elle : streetwear, maternity, sportswear et modeste.
                </p>
                <button className="mt-4 text-harmonia-red font-semibold hover:underline">
                  Voir la collection ›
                </button>
              </div>
            </div>

            {/* Homme */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-64 bg-harmonia-black flex items-center justify-center">
                <span className="text-harmonia-cream text-2xl font-montserrat font-bold">HOMME</span>
              </div>
              <div className="p-6">
                <p className="text-harmonia-black">
                  Streetwear urbain et élégant. Des pièces qui allient style et confort.
                </p>
                <button className="mt-4 text-harmonia-red font-semibold hover:underline">
                  Voir la collection ›
                </button>
              </div>
            </div>

            {/* Enfant */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-64 bg-harmonia-red flex items-center justify-center">
                <span className="text-harmonia-cream text-2xl font-montserrat font-bold">ENFANT</span>
              </div>
              <div className="p-6">
                <p className="text-harmonia-black">
                  Vêtements confortables et stylés pour les plus jeunes. Qualité et durabilité.
                </p>
                <button className="mt-4 text-harmonia-red font-semibold hover:underline">
                  Voir la collection ›
                </button>
              </div>
            </div>
          </div>

          {/* Collections Spécialisées */}
          <h2 className="text-3xl font-montserrat font-bold text-center text-harmonia-black mb-12">
            COLLECTIONS SPÉCIALISÉES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Maternity */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-40 bg-harmonia-mauve flex items-center justify-center">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">MATERNITY</span>
              </div>
              <div className="p-4">
                <p className="text-harmonia-black text-sm">
                  Confort et style pendant la grossesse.
                </p>
              </div>
            </div>

            {/* Streetwear */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-40 bg-harmonia-black flex items-center justify-center">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">STREETWEAR</span>
              </div>
              <div className="p-4">
                <p className="text-harmonia-black text-sm">
                  Style urbain et tendance pour tous.
                </p>
              </div>
            </div>

            {/* Sportswear */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-40 bg-harmonia-red flex items-center justify-center">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">SPORTSWEAR</span>
              </div>
              <div className="p-4">
                <p className="text-harmonia-black text-sm">
                  Confort et performance au quotidien.
                </p>
              </div>
            </div>

            {/* Muslim */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-40 bg-gradient-to-r from-harmonia-black to-harmonia-mauve flex items-center justify-center">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">MUSLIM</span>
              </div>
              <div className="p-4">
                <p className="text-harmonia-black text-sm">
                  Élégance et pudeur dans le style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-harmonia-black text-harmonia-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">
            RESTEZ CONNECTÉ
          </h2>
          <p className="text-harmonia-mauve mb-8 max-w-md mx-auto">
            Soyez les premiers à découvrir nos nouvelles collections et offres exclusives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-grow px-4 py-3 rounded-lg bg-harmonia-cream text-harmonia-black placeholder-harmonia-mauve"
            />
            <button className="bg-harmonia-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}