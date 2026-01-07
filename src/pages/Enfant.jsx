import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ui/ProductCard.jsx";
import { apiGet } from "../services/api"; // <-- utilise l'API, plus de mock

export default function Enfant() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let off = false;
    apiGet("/api/products")
      .then(d => !off && setProducts(d))
      .catch(e => !off && setError(e))
      .finally(() => !off && setLoading(false));
    return () => { off = true; };
  }, []);

  const norm = (s) => (s || "").trim().toLowerCase();
  const productsEnfant = useMemo(
    () => products.filter(p => norm(p.category) === "enfant"),
    [products]
  );

  if (loading) return <div className="container mx-auto px-4 py-8">Chargement…</div>;
  if (error)   return <div className="container mx-auto px-4 py-8 text-red-500">Erreur : {String(error.message || error)}</div>;

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6">
            NOS PRODUITS ENFANT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsEnfant.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {productsEnfant.length === 0 && (
            <p className="mt-6 text-harmonia-mauve">Aucun produit enfant pour le moment.</p>
          )}
        </section>

        {/* Sous-catégories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a href="#streetwear-enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">STREETWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Style urbain pour les kids</p>
              </div>
            </div>
          </a>

          <a href="#sportswear-enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">SPORTSWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Confort pour les activités</p>
              </div>
            </div>
          </a>

          <a href="#muslim-enfant" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-r from-harmonia-black to-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">MUSLIM</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Mode modeste enfant</p>
              </div>
            </div>
          </a>
        </div>

        {/* Tranches d'âge + Sportswear */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tranches d'âge */}
          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6 text-center">
               PAR TRANCHES D'ÂGE
            </h2>
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="p-4 border border-harmonia-mauve rounded-lg">
                <h3 className="font-semibold text-harmonia-black mb-2">2-6 ans</h3>
                <p className="text-harmonia-mauve text-sm">Tout-petits - Confort maximal</p>
              </div>
              <div className="p-4 border border-harmonia-mauve rounded-lg">
                <h3 className="font-semibold text-harmonia-black mb-2">7-12 ans</h3>
                <p className="text-harmonia-mauve text-sm">Enfants - Durabilité</p>
              </div>
              <div className="p-4 border border-harmonia-mauve rounded-lg">
                <h3 className="font-semibold text-harmonia-black mb-2">13-16 ans</h3>
                <p className="text-harmonia-mauve text-sm">Ados - Style affirmé</p>
              </div>
            </div>
          </section>

          {/* Sportswear Enfant */}
          <section className="bg-gradient-to-br from-harmonia-red to-harmonia-mauve rounded-2xl p-6 text-harmonia-cream">
            <h2 className="text-2xl font-montserrat font-bold mb-4 text-center">
               SPORTSWEAR ENFANT
            </h2>
            <p className="mb-4 text-center">
              Des vêtements techniques et confortables pour les activités de vos enfants
            </p>
            <div className="text-center space-y-2">
              <p>• Tenues de sport</p>
              <p>• Maillots et shorts</p>
              <p>• Survêtements</p>
              <p>• Chaussures adaptées</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
