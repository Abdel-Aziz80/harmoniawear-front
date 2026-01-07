// src/components/ui/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";
import { formatPrice, labelCollection, labelCategory } from "../../utils/formatters.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  // tailles: XS..XXL ou 52..60 (abaya) ou TU
  const sizeOptions =
    Array.isArray(product?.sizes) && product.sizes.length ? product.sizes.map(String) : ["TU"];
  const colorOptions =
    Array.isArray(product?.colors) && product.colors.length ? product.colors : [];

  const [size, setSize] = useState(sizeOptions[0]);
  const [color, setColor] = useState(colorOptions[0] ?? null);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? "",
      size,
      color,
      quantity: 1,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block h-full bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image + badge */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <span className="absolute top-2 right-2 text-[11px] bg-black/80 text-white px-2 py-0.5 rounded">
          {labelCollection(product.collection)}
        </span>
      </div>

      {/* Corps */}
      <div className="flex flex-col p-4 md:p-5 h-[calc(100%-theme(spacing.56))]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-harmonia-black">{product.name}</h3>
          <div className="text-harmonia-red font-bold">{formatPrice(product.price)}</div>
        </div>
        <p className="text-sm text-harmonia-mauve">{labelCategory(product.category)}</p>

        {/* Tailles */}
        <div className="mt-3">
          <p className="text-sm mb-2">Taille</p>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={(ev) => { ev.preventDefault(); setSize(s); }}
                className={`px-3 py-1 rounded border text-sm md:text-base ${
                  s === size ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"
                }`}
                aria-pressed={s === size}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Couleurs */}
        {!!colorOptions.length && (
          <div className="mt-3">
            <p className="text-sm mb-2">Couleur</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={(ev) => { ev.preventDefault(); setColor(c); }}
                  className={`px-3 py-1 rounded border text-sm md:text-base ${
                    c === color ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                  aria-pressed={c === color}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA collé en bas */}
        <div className="mt-4 md:mt-5 pt-2 md:pt-3 border-t border-gray-100">
          <button
            onClick={handleAdd}
            className="w-full bg-black text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-harmonia-red transition"
            data-testid={`add-to-cart-btn-${product.id}`}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </Link>
  );
}
