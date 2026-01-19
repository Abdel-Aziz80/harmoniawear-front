export default function Maternity() {
  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-4">
            MATERNITY
          </h1>
          <p className="text-harmonia-mauve text-lg max-w-2xl mx-auto">
            Confort optimal et style affirmé pour votre grossesse. 
            Des pièces adaptées pour le sport et le quotidien.
          </p>
        </section>

        <div className="bg-white rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-4">
            Collection en préparation
          </h2>
          <p className="text-harmonia-mauve mb-6">
            Nous travaillons sur une collection maternity unique, 
            alliant confort technique et style streetwear.
          </p>
          <button className="bg-harmonia-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Être informé du lancement
          </button>
        </div>

      </div>
    </div>
  )
}