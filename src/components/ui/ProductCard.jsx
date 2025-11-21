// src/components/ui/ProductCard.jsx
import { useCart } from '../../contexts/useCart.js'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product)
    // Petit feedback visuel (optionnel)
    console.log(`✅ ${product.name} ajouté au panier!`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image du produit */}
      <div className="h-48 bg-harmonia-mauve flex items-center justify-center relative">
        <span className="text-harmonia-cream text-sm">🖼️ {product.name}</span>
        {/* Badge collection */}
        <span className="absolute top-2 right-2 bg-harmonia-black text-harmonia-cream text-xs px-2 py-1 rounded">
          {product.collection}
        </span>
      </div>

      {/* Infos produit */}
      <div className="p-4">
        <h3 className="font-semibold text-harmonia-black text-lg mb-2">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-harmonia-red font-bold text-xl">
            {product.price}€
          </span>
          <span className="text-harmonia-mauve text-sm capitalize">
            {product.category}
          </span>
        </div>

        {/* Bouton Ajouter au panier */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-harmonia-black text-harmonia-cream py-3 rounded-lg font-semibold hover:bg-harmonia-red transition-all duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}