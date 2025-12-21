// src/components/ui/ProductCard.jsx
import { useCart } from '../../contexts/useCart.js'
import { formatPrice, labelCollection, labelCategory } from "../../utils/formatters.js";
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    console.log(`✅ ${product.name} ajouté au panier!`)
  }

  return (
    <Link 
      to={`/product/${product.id}`}
      data-testid={`product-card-${product.id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
    >
      {/* Image du produit */}
      <div className="h-48 bg-harmonia-mauve flex items-center justify-center relative">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid={`product-image-${product.id}`}
          />
        ) : (
          <span className="text-harmonia-cream text-sm">🖼️ {product.name}</span>
        )}
        {/* Badge collection */}
        <span 
          className="absolute top-2 right-2 bg-harmonia-black text-harmonia-cream text-xs px-2 py-1 rounded"
          data-testid={`product-collection-badge-${product.id}`}
        >
          {labelCollection(product.collection)}
        </span>
      </div>

      {/* Infos produit */}
      <div className="p-4">
        <h3 
          className="font-semibold text-harmonia-black text-lg mb-2"
          data-testid={`product-name-${product.id}`}
        >
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span 
            className="text-harmonia-red font-bold text-xl"
            data-testid={`product-price-${product.id}`}
          >
            {formatPrice(product.price)}
          </span>
          <span 
            className="text-harmonia-mauve text-sm"
            data-testid={`product-category-${product.id}`}
          >
            {labelCategory(product.category)}
          </span>
        </div>

        {/* Bouton Ajouter au panier */}
        <button 
          onClick={handleAddToCart}
          data-testid={`add-to-cart-btn-${product.id}`}
          className="w-full bg-harmonia-black text-harmonia-cream py-3 rounded-lg font-semibold hover:bg-harmonia-red transition-all duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </Link>
  )
}