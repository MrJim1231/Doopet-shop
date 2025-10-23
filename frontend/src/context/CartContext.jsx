import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(false);

  // Получаем или создаём sessionId (для гостей)
  const sessionId =
    localStorage.getItem("sessionId") ||
    (() => {
      const id = Math.random().toString(36).substring(2);
      localStorage.setItem("sessionId", id);
      return id;
    })();

  // 🔹 Загрузка корзины при старте
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

  // 🔹 Добавить товар в корзину
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

  // 🔹 Удалить товар (через DELETE)
  const removeFromCart = async (productId) => {
    try {
      // DELETE должен передавать тело через data:
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: { sessionId, productId },
      });

      // Локально убираем товар без перезагрузки:
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.productId._id !== productId),
      }));
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
    }
  };

  // 🔹 Очистить корзину
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

  // 🔹 Подсчёт количества и суммы
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
