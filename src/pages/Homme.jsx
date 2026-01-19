import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ui/ProductCard.jsx";
import { apiGet } from "../services/api";

export default function Homme() {
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
  const productsHomme = useMemo(
    () => products.filter(p => norm(p.category) === "homme"),
    [products]
  );

  if (loading) return <div className="container mx-auto px-4 py-8">Chargement…</div>;
  if (error)   return <div className="container mx-auto px-4 py-8 text-red-500">Erreur : {String(error.message || error)}</div>;

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* … contenu existant … */}
        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6 text-center">
            NOS PRODUITS HOMME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsHomme.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Catégories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a href="#streetwear-homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-black flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">STREETWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Style urbain masculin</p>
              </div>
            </div>
          </a>

          <a href="#sportswear-homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-harmonia-red flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">SPORTSWEAR</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Confort et performance</p>
              </div>
            </div>
          </a>

          <a href="#muslim-homme" className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-r from-harmonia-black to-harmonia-mauve flex items-center justify-center group-hover:scale-105 transition">
                <span className="text-harmonia-cream text-xl font-montserrat font-bold">MUSLIM</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-harmonia-black">Élégance et pudeur</p>
              </div>
            </div>
          </a>
        </div>

        {/* Collection Muslim Homme détaillée */}
        <section className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-montserrat font-bold text-harmonia-black mb-6 text-center">
            COLLECTION MUSLIM HOMME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-4 border border-harmonia-mauve rounded-lg">
              <h3 className="font-semibold text-harmonia-black mb-2">Tenues traditionnelles</h3>
              <p className="text-harmonia-mauve text-sm">Jalabiyas, thawbs élégants</p>
            </div>
            <div className="p-4 border border-harmonia-mauve rounded-lg">
              <h3 className="font-semibold text-harmonia-black mb-2">Style moderne</h3>
              <p className="text-harmonia-mauve text-sm">Vêtements modestes contemporains</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}