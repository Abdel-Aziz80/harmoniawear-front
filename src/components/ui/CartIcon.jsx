// src/components/ui/CartIcon.jsx
import { useCart } from "../../contexts/CartContext.jsx";

export default function CartIcon({ className = "" }) {
  const { itemsCount } = useCart();
  return (
    <span className={`relative inline-block ${className}`} aria-label="Panier">
      🛒
      {itemsCount > 0 && (
        <span
          className="absolute -top-1 -right-2 bg-harmonia-red text-white text-xs rounded-full px-1 min-w-[1.25rem] text-center"
          title={`${itemsCount} article(s)`}
        >
          {itemsCount}
        </span>
      )}
    </span>
  );
}
