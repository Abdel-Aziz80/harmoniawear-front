import { useCart } from '../contexts/useCart.js'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatters'

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <h1 
          className="text-4xl font-montserrat font-bold text-harmonia-black mb-8"
          data-testid="cart-title"
        >
          VOTRE PANIER
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl" data-testid="empty-cart">
            <p className="text-harmonia-mauve text-lg mb-4">Votre panier est vide</p>
            <Link 
              to="/"
              data-testid="discover-collections-btn"
              className="inline-block bg-harmonia-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
            >
              Découvrir nos collections
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6" data-testid="cart-items-container">
            {/* Liste des articles */}
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between border-b border-harmonia-mauve pb-"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-harmonia-mauve rounded-lg flex items-center justify-center">
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-harmonia-cream text-xs">IMG</span>
                      )}
                    </div>
                    <div>
                      <h3 
                        className="font-semibold text-harmonia-black"
                        data-testid={`cart-item-name-${item.id}`}
                      >
                        {item.name}
                      </h3>
                      <p 
                        className="text-harmonia-red font-bold"
                        data-testid={`cart-item-price-${item.id}`}
                      >
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      data-testid={`decrease-quantity-btn-${item.id}`}
                      className="w-8 h-8 bg-harmonia-mauve text-white rounded hover:bg-opacity-80 transition"
                    >
                      -
                    </button>
                    <span 
                      className="mx-2 w-8 text-center"
                      data-testid={`cart-item-quantity-${item.id}`}
                    >
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      data-testid={`increase-quantity-btn-${item.id}`}
                      className="w-8 h-8 bg-harmonia-red text-white rounded hover:bg-opacity-80 transition"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      data-testid={`remove-item-btn-${item.id}`}
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
                <span 
                  className="text-xl font-bold text-harmonia-red"
                  data-testid="cart-total"
                >
                  {formatPrice(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button 
                  onClick={clearCart}
                  data-testid="clear-cart-btn"
                  className="flex-1 bg-harmonia-mauve text-white py-3 rounded-lg hover:bg-opacity-90 transition"
                >
                  Vider le panier
                </button>
                <Link 
                  to="/checkout"
                  data-testid="proceed-checkout-btn"
                  className="flex-1 bg-harmonia-red text-white py-3 rounded-lg hover:bg-opacity-90 transition text-center font-semibold"
                >
                  Commander ({formatPrice(total)})
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}