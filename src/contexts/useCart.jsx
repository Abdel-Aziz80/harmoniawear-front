// src/contexts/useCart.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const LS_KEY = "HW_CART_V1";

function readLS() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readLS()); // [{id, name, price, size, qty}]

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, { size } = {}) => {
    setItems((prev) => {
      const key = `${product.id}__${size || ""}`;
      const idx = prev.findIndex((it) => `${it.id}__${it.size || ""}` === key);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size: size || null,
          qty: 1,
          image: product.images?.[0] || null,
        },
      ];
    });
  };

  const removeItem = (id, size = null) =>
    setItems((prev) => prev.filter((it) => !(it.id === id && (it.size || null) === (size || null))));

  const setQty = (id, size, qty) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id && (it.size || null) === (size || null) ? { ...it, qty: Math.max(1, qty) } : it
      )
    );

  const clear = () => setItems([]);

  const itemsCount = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, itemsCount, total }),
    [items, itemsCount, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
