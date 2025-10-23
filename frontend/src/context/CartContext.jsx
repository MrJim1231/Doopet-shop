import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(false);

  const sessionId =
    localStorage.getItem("sessionId") ||
    (() => {
      const id = Math.random().toString(36).substring(2);
      localStorage.setItem("sessionId", id);
      return id;
    })();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cart", {
        params: { sessionId },
      });
      setCart(res.data || { items: [], cartTotal: 0 });
    } catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        sessionId,
        productId,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: { sessionId, productId },
      });
      await fetchCart();
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        data: { sessionId },
      });
      setCart({ items: [], cartTotal: 0 });
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
    }
  };

  const updateQuantityLocally = (productId, newQty) => {
    setCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.productId._id === productId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.price * newQty,
            }
          : item
      );
      return { ...prev, items: updatedItems };
    });
  };

  const totalCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cart?.items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        updateQuantityLocally,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
