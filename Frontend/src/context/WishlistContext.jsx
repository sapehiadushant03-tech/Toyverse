import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const readStoredWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("toyverse-wishlist") || "[]");
  } catch {
    return [];
  }
};

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readStoredWishlist);

  useEffect(() => {
    localStorage.setItem("toyverse-wishlist", JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, { ...product, id: product.id || product._id }];
    });
  };

  const isSaved = (id) => items.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
