import { Link} from "react-router-dom";
export default function Muslim() {
  return (
    <main className="min-h-screen bg-harmonia-cream">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link to="/femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">FEMME</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Abayas, jilbabs, hijabs stylés</p>
              </div>
            </div>
          </Link>

          <Link to="/homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">HOMME</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Tenues modestes et élégantes</p>
              </div>
            </div>
          </Link>

          <Link to="/enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">ENFANT</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Vêtements modestes kids</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Valeurs */}
        <div className="bg-harmonia-black text-harmonia-cream rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold mb-4">
             NOS VALEURS
          </h2>
          <p className="text-harmonia-mauve">
            Des matières de qualité, des coupes respectueuses et un style authentique 
            qui allient tradition et modernité.
          </p>
        </div>

      </div>
    </main>
  )
}