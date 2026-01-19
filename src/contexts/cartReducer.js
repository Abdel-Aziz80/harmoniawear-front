// État initial
export const initialState = {
  items: [],
  total: 0,
  itemCount: 0
}

// Reducer pour gérer les actions
export function cartReducer(state, action) {
  let existingItem, updatedItems, newItem, itemToRemove, filteredItems, item, totalDiff

  switch (action.type) {
    case 'ADD_ITEM':
      existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // Si l'article existe déjà, augmenter la quantité
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1
        }
      } else {
        // Nouvel article
        newItem = { ...action.payload, quantity: 1 }
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1
        }
      }

    case 'REMOVE_ITEM':
      itemToRemove = state.items.find(item => item.id === action.payload)
      filteredItems = state.items.filter(item => item.id !== action.payload)
      
      return {
        ...state,
        items: filteredItems,
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      }

    case 'UPDATE_QUANTITY':
      updatedItems = state.items.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, quantity: action.payload.quantity }
        }
        return cartItem
      })

      item = state.items.find(cartItem => cartItem.id === action.payload.id)
      totalDiff = (action.payload.quantity - item.quantity) * item.price

      return {
        ...state,
        items: updatedItems,
        total: state.total + totalDiff,
        itemCount: state.itemCount + (action.payload.quantity - item.quantity)
      }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}