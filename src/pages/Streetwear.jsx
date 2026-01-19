export default function Streetwear() {
  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-4">
            STREETWEAR
          </h1>
          <p className="text-harmonia-mauve text-lg max-w-2xl mx-auto">
            Style urbain, pièces authentiques et looks affirmés. 
            Exprimez votre personnalité sans compromis.
          </p>
        </section>

        {/* Collections par public */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a href="/femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">FEMME</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Looks urbains féminins</p>
              </div>
            </div>
          </a>

          <a href="/homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">HOMME</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Style masculin affirmé</p>
              </div>
            </div>
          </a>

          <a href="/enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">ENFANT</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Streetwear kids</p>
              </div>
            </div>
          </a>
        </div>

        {/* Inspiration */}
        <div className="bg-harmonia-black text-harmonia-cream rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold mb-4">
             STYLE URBAN
          </h2>
          <p className="text-harmonia-mauve">
            Des pièces qui capturent l'essence de la rue, 
            mêlant confort, authenticité et tendances actuelles.
          </p>
        </div>

      </div>
    </div>
  )
}