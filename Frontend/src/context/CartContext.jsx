import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

const readStoredCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = localStorage.getItem("toyverse-cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem("toyverse-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prevItems) => {
      const normalizedQty = Number(quantity) > 0 ? Number(quantity) : 1;
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + normalizedQty }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          id: product.id ?? product.name,
          quantity: normalizedQty,
          image: product.image || product.images?.[0] || "",
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
