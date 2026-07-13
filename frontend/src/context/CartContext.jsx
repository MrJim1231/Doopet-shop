import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; // 🟢 импорт авторизации

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth(); // 🟢 получаем токен и пользователя
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

  // 🟢 Загрузка корзины
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/cart`, {
        params: { userId: user?._id, sessionId },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      // console.log("📦 Загружена корзина:", res.data);
      setCart(res.data || { items: [], cartTotal: 0 });
    } catch (error) {
      console.error("❌ Ошибка при загрузке корзины:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Добавление товара в корзину
  const addToCart = async (productId, quantity = 1) => {
    try {
      // console.log("🟢 Отправка на сервер:");
      // console.log({
      //   userId: user?._id,
      //   sessionId,
      //   productId,
      //   quantity,
      //   token: token ? "Токен есть ✅" : "Без токена ❌",
      // });

      await axios.post(
        `${API_URL}/api/cart/add`,
        { sessionId, productId, quantity },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      // console.log("✅ Товар успешно добавлен на сервер");
      await fetchCart();

      toast.success("🛒 Товар добавлен в корзину!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("❌ Ошибка при добавлении в корзину:", error);
      toast.error("❌ Не удалось добавить товар", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // 🟡 Удаление товара
  const removeFromCart = async (productId) => {
    // console.log("🗑️ Удаление товара из корзины:", productId);
    removeFromCartLocally(productId);

    try {
      await axios.delete(`${API_URL}/api/cart/remove`, {
        data: { userId: user?._id, sessionId, productId },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      toast.info("🗑️ Товар удалён из корзины", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("❌ Ошибка при удалении из корзины:", error);
      toast.error("❌ Ошибка при удалении товара", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // 🟢 Локальное удаление
  const removeFromCartLocally = (productId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId._id !== productId),
    }));
  };

  // 🔴 Очистка корзины
  const clearCart = async () => {
    // console.log("🚫 Очистка корзины...");
    try {
      await axios.delete(`${API_URL}/api/cart/clear`, {
        data: { userId: user?._id, sessionId },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCart({ items: [], cartTotal: 0 });
      toast.warn("🚫 Корзина очищена", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("❌ Ошибка при очистке корзины:", error);
      toast.error("❌ Ошибка при очистке корзины", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // 🟡 Локальное обновление количества
  const updateQuantityLocally = (productId, newQty) => {
    setCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQty, totalPrice: item.price * newQty }
          : item
      );
      return { ...prev, items: updatedItems };
    });
  };

  // 🔹 Подсчёты
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
        removeFromCartLocally,
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
