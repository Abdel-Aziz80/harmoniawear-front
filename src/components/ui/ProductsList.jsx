// src/components/ui/ProductsList.jsx
import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";   
import ProductCard from "./ProductCard";

export default function ProductsList({ className = "", onAddToCart }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    apiGet("/api/products")
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p className="p-6">Chargement…</p>;
  if (error)   return <p className="p-6 text-red-500">Erreur : {String(error.message || error)}</p>;
  if (!data.length) return <p className="p-6">Aucun produit pour le moment.</p>;

  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {data.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          {...p}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
