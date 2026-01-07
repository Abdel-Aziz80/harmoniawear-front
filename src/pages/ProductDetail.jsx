// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiGet } from "../services/api";
import { useCart } from "../contexts/CartContext.jsx";
import { formatPrice, labelCollection, labelCategory } from "../utils/formatters";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let off = false;
    apiGet(`/api/products/${id}`)
      .then((data) => {
        if (!off) {
          setProduct(data);
          // Sélection par défaut
          if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
          if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        }
      })
      .catch((e) => !off && setError(e))
      .finally(() => !off && setLoading(false));
    
    return () => { off = true; };
  }, [id]);

   const handleAddToCart = () => {
    if (!product) return;

    // Construire l'item au format attendu par CartContext
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
      size: selectedSize || null,      // <-- clés attendues : size / color
      color: selectedColor || null,
      quantity,                        // <-- une seule fois, pas de boucle
    });

    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-harmonia-cream flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-harmonia-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 text-center" data-testid="product-error">
            <p className="text-red-600 mb-4">
              {error?.message || "Produit introuvable"}
            </p>
            <Link
              to="/"
              className="inline-block bg-harmonia-black text-white px-6 py-2 rounded-lg hover:bg-harmonia-red transition"
              data-testid="back-home-btn"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" data-testid="breadcrumb">
          <Link to="/" className="text-harmonia-mauve hover:text-harmonia-red">
            Accueil
          </Link>
          <span className="mx-2 text-harmonia-mauve">/</span>
          <Link
            to={`/${product.category}`}
            className="text-harmonia-mauve hover:text-harmonia-red"
          >
            {labelCategory(product.category)}
          </Link>
          <span className="mx-2 text-harmonia-mauve">/</span>
          <span className="text-harmonia-black">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Colonne gauche : Image */}
            <div className="space-y-4">
              <div
                className="aspect-square bg-harmonia-cream rounded-lg overflow-hidden"
                data-testid="product-main-image"
              >
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-harmonia-mauve">
                    <span className="text-6xl">🖼️</span>
                  </div>
                )}
              </div>
              
              {/* Miniatures (si plusieurs images) */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-harmonia-cream rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition"
                      data-testid={`product-thumbnail-${idx}`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Colonne droite : Détails */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span
                  className="inline-block bg-harmonia-black text-harmonia-cream text-sm px-3 py-1 rounded-full mb-2"
                  data-testid="product-collection-badge"
                >
                  {labelCollection(product.collection)}
                </span>
                <h1
                  className="text-3xl font-montserrat font-bold text-harmonia-black mb-2"
                  data-testid="product-detail-name"
                >
                  {product.name}
                </h1>
                <p
                  className="text-4xl font-bold text-harmonia-red mb-4"
                  data-testid="product-detail-price"
                >
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6" data-testid="product-description">
                  <h3 className="text-lg font-semibold text-harmonia-black mb-2">
                    Description
                  </h3>
                  <p className="text-harmonia-mauve">{product.description}</p>
                </div>
              )}

              {/* Stock */}
              <div className="mb-6" data-testid="product-stock">
                {product.stock > 0 ? (
                  <span className="text-green-600">✓ En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})</span>
                ) : (
                  <span className="text-red-600">✗ Rupture de stock</span>
                )}
              </div>

              {/* Tailles */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6" data-testid="size-selector">
                  <label className="block text-sm font-semibold text-harmonia-black mb-2">
                    Taille
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        data-testid={`size-option-${size}`}
                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition ${
                          selectedSize === size
                            ? "border-harmonia-red bg-harmonia-red text-white"
                            : "border-harmonia-mauve text-harmonia-black hover:border-harmonia-red"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleurs */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6" data-testid="color-selector">
                  <label className="block text-sm font-semibold text-harmonia-black mb-2">
                    Couleur
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        data-testid={`color-option-${color}`}
                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition ${
                          selectedColor === color
                            ? "border-harmonia-red bg-harmonia-red text-white"
                            : "border-harmonia-mauve text-harmonia-black hover:border-harmonia-red"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div className="mb-6" data-testid="quantity-selector">
                <label className="block text-sm font-semibold text-harmonia-black mb-2">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="quantity-decrease-btn"
                    className="w-10 h-10 bg-harmonia-mauve text-white rounded-lg hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span
                    className="text-xl font-semibold w-12 text-center"
                    data-testid="quantity-value"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    data-testid="quantity-increase-btn"
                    className="w-10 h-10 bg-harmonia-red text-white rounded-lg hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bouton Ajouter au panier */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                data-testid="add-to-cart-detail-btn"
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  product.stock === 0
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-harmonia-black text-white hover:bg-harmonia-red"
                }`}
              >
                {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
