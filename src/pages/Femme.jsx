import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ui/ProductCard.jsx";
import { apiGet } from "../services/api";

export default function Femme() {
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

  const norm = s => (s || "").trim().toLowerCase();
  const productsFemme = useMemo(
    () => products.filter(p => norm(p.category) === "femme"),
    [products]
  );

  if (loading) return <div className="container mx-auto px-4 py-8">Chargement…</div>;
  if (error)   return <div className="container mx-auto px-4 py-8 text-red-500">Erreur : {String(error.message || error)}</div>;

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* … contenu identique … */}
        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6 text-center">
            NOS PRODUITS FEMME
          </h2>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {productsFemme.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Sous-catégories - 4 COLONNES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a href="#maternity" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">MATERNITY</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Confort et style grossesse</p>
              </div>
            </div>
          </a>

          <a href="#streetwear-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">STREETWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Style urbain et tendance</p>
              </div>
            </div>
          </a>

          <a href="#sportswear-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">SPORTSWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Confort et performance</p>
              </div>
            </div>
          </a>

          <a href="#muslim-femme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-r from-harmonia-black to-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-lg font-montserrat font-bold">MUSLIM</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black text-sm">Élégance et pudeur</p>
              </div>
            </div>
          </a>
        </div>

        {/* Sections détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sportswear Femme */}
          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-4 text-center">
              SPORTSWEAR FEMME
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-harmonia-red">•</span>
                <div>
                  <h3 className="font-semibold text-harmonia-black">Tenues de sport</h3>
                  <p className="text-harmonia-mauve text-sm">Leggings, tops techniques, brassières</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-harmonia-red">•</span>
                <div>
                  <h3 className="font-semibold text-harmonia-black">Vêtements fitness</h3>
                  <p className="text-harmonia-mauve text-sm">Confort optimal pour l'entraînement</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-harmonia-red">•</span>
                <div>
                  <h3 className="font-semibold text-harmonia-black">Sportswear urbain</h3>
                  <p className="text-harmonia-mauve text-sm">Style et performance au quotidien</p>
                </div>
              </div>
            </div>
          </section>

          {/* Maternity Sport */}
          <section className="bg-gradient-to-br from-harmonia-mauve to-harmonia-red rounded-2xl p-6 text-harmonia-cream">
            <h2 className="text-2xl font-montserrat font-bold mb-4 text-center">
              MATERNITY SPORT
            </h2>
            <p className="text-center mb-4">
              Une collection spéciale conçue pour le confort des femmes enceintes pendant leurs activités sportives
            </p>
            <div className="text-center">
              <a 
                href="/maternity" 
                className="inline-block bg-harmonia-cream text-harmonia-black px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition text-sm"
              >
                Découvrir Maternity
              </a>
            </div>
          </section>
        </div>

        {/* Produits en vedette */}
        <section className="mt-12">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6 text-center">
            PRODUITS EN VEDETTE
          </h2>
          <div className="text-center py-8 bg-white rounded-2xl">
            <p className="text-harmonia-mauve">Bientôt disponible...</p>
            <p className="text-harmonia-mauve text-sm mt-2">Nos collections sont en préparation</p>
          </div>
        </section>

      </div>
    </div>
  )
}