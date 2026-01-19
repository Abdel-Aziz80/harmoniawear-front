import { useReducer } from 'react'
import { cartReducer, initialState } from './cartReducer.js'
import { CartContext } from './CartContext.jsx'

// Provider Component seulement
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}