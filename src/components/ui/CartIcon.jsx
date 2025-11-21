// src/components/ui/CartIcon.jsx
import { useCart } from '../../contexts/useCart.js'

export default function CartIcon({ className = '' }) {
  const { itemsCount = 0 } = useCart()
  return (
    <span className={`relative ${className}`}>
      🛒
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-harmonia-red text-white text-xs rounded-full px-1">
          {itemsCount}
        </span>
      )}
    </span>
  )
}
