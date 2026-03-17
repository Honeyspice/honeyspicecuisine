import React from 'react';

const CartContext = React.createContext(null);

const STORAGE_KEY = 'honeyspice.cart.v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items };
  } catch {
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.item;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: item.quantity ?? 1 }] };
    }
    case 'REMOVE_ITEM': {
      return { items: state.items.filter((i) => i.id !== action.id) };
    }
    case 'SET_QUANTITY': {
      const qty = Math.max(1, Number(action.quantity || 1));
      return {
        items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: qty } : i)),
      };
    }
    case 'CLEAR': {
      return { items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = React.useReducer(cartReducer, undefined, loadInitialState);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence failures
    }
  }, [state]);

  const addItem = React.useCallback((item) => dispatch({ type: 'ADD_ITEM', item }), []);
  const removeItem = React.useCallback((id) => dispatch({ type: 'REMOVE_ITEM', id }), []);
  const setQuantity = React.useCallback(
    (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }),
    []
  );
  const clear = React.useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const itemCount = React.useMemo(
    () => state.items.reduce((sum, i) => sum + (i.quantity || 0), 0),
    [state.items]
  );
  const subtotal = React.useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value = React.useMemo(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
    }),
    [state.items, itemCount, subtotal, addItem, removeItem, setQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

