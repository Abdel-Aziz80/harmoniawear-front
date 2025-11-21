import { useCart } from '../contexts/useCart.js'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-montserrat font-bold text-harmonia-black mb-8">
          VOTRE PANIER
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-harmonia-mauve text-lg mb-4">Votre panier est vide</p>
            <Link 
              to="/" 
              className="bg-harmonia-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
            >
              Découvrir nos collections
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6">
            {/* Liste des articles */}
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b border-harmonia-mauve pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-harmonia-mauve rounded-lg flex items-center justify-center">
                      <span className="text-harmonia-cream text-xs">IMG</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-harmonia-black">{item.name}</h3>
                      <p className="text-harmonia-red font-bold">{item.price}€</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 bg-harmonia-mauve text-white rounded hover:bg-opacity-80 transition"
                    >
                      -
                    </button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-harmonia-red text-white rounded hover:bg-opacity-80 transition"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-harmonia-mauve hover:text-harmonia-red transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-harmonia-mauve">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total :</span>
                <span className="text-xl font-bold text-harmonia-red">{total.toFixed(2)}€</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button 
                  onClick={clearCart}
                  className="flex-1 bg-harmonia-mauve text-white py-3 rounded-lg hover:bg-opacity-90 transition"
                >
                  Vider le panier
                </button>
                <button className="flex-1 bg-harmonia-red text-white py-3 rounded-lg hover:bg-opacity-90 transition">
                  Commander ({total.toFixed(2)}€)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}