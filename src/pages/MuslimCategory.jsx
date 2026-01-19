import { useParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";

export default function MuslimCategory() {
  const { category } = useParams(); // femme | homme | enfant

  const titles = {
    femme: "Femme",
    homme: "Homme",
    enfant: "Enfant",
  };

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.collection === "muslim" &&
      product.category === category
  );

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-10">
        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-4">
          Collection Muslim – {titles[category]}
        </h1>

        <p className="text-harmonia-mauve mb-10 max-w-2xl">
          Découvrez notre sélection Muslim pour {titles[category].toLowerCase()},
          alliant pudeur, confort et élégance.
        </p>

        {/* Cas aucun produit */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-harmonia-mauve">
            Aucun produit disponible pour cette catégorie.
          </p>
        )}

        {/* Grille produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h3 className="font-montserrat font-semibold text-lg mb-2">
                  {product.name}
                </h3>

                <p className="text-harmonia-red font-bold text-lg">
                  {product.price.toFixed(2)} €
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
