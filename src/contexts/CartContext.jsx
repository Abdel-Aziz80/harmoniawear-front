// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const LS_KEY = "HW_CART_V2";

function initFromLS() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? { items: [] };
  } catch {
    return { items: [] };
  }
}
function saveLS(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item } = action; // {id,name,price,image,size?,color?,quantity?}
      const same = (i) =>
        i.id === item.id &&
        (i.size || "") === (item.size || "") &&
        (i.color || "") === (item.color || "");
      const idx = state.items.findIndex(same);
      const items = [...state.items];
      if (idx !== -1) {
        items[idx] = { ...items[idx], quantity: items[idx].quantity + (item.quantity || 1) };
      } else {
        items.push({ ...item, quantity: item.quantity || 1 });
      }
      return { ...state, items };
    }
    case "UPDATE_QTY": {
      const { id, size, color, quantity } = action;
      const items = state.items.map((i) =>
        i.id === id && (i.size || "") === (size || "") && (i.color || "") === (color || "")
          ? { ...i, quantity: Math.max(1, quantity) }
          : i
      );
      return { ...state, items };
    }
    case "REMOVE": {
      const { id, size, color } = action;
      const items = state.items.filter(
        (i) => !(i.id === id && (i.size || "") === (size || "") && (i.color || "") === (color || ""))
      );
      return { ...state, items };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initFromLS);
  useEffect(() => saveLS(state), [state]);

  const value = useMemo(() => {
    const itemsCount = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items: state.items,
      itemsCount,
      subtotal,
      addItem: (item) => dispatch({ type: "ADD", item }),
      updateQty: (p) => dispatch({ type: "UPDATE_QTY", ...p }),
      removeItem: (p) => dispatch({ type: "REMOVE", ...p }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
