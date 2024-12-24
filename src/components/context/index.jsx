import { useContext, createContext, useState, useEffect } from "react";

// Kontekstni yaratamiz
const Context = createContext();

// Kontekst provider
export const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("count")) || 0
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("count", JSON.stringify(count));
  }, [wishlist, count]);

  return (
    <Context.Provider value={{ count, setCount, wishlist, setWishlist }}>
      {children}
    </Context.Provider>
  );
};

// Context'ni foydalanish uchun hook
export const useStateValue = () => useContext(Context);
