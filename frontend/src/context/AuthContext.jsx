import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Загружаем профиль при наличии токена
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        // 🔁 После успешного входа переносим корзину (если нужно)
        const sessionId = localStorage.getItem("sessionId");
        const migrated = localStorage.getItem("migrated") === "true";

        if (sessionId && !migrated) {
          try {
            // console.log("🟢 Проверяем наличие корзины для миграции...");

            // Проверим, есть ли вообще корзина у гостя
            const cartCheck = await axios.get(
              `${API_URL}/api/cart`,
              { params: { sessionId } }
            );

            if (cartCheck.data?.items?.length > 0) {
              console.log("🛒 Найдена гостевая корзина, переносим...");
              await axios.post(
                `${API_URL}/api/cart/migrate`,
                { sessionId },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              console.log("✅ Миграция корзины завершена");
            } else {
              // console.log("⚪ Гостевая корзина пуста — миграция не требуется.");
            }

            localStorage.setItem("migrated", "true");
          } catch (err) {
            console.error("❌ Ошибка миграции корзины:", err.message);
          }
        }
      } catch (err) {
        console.warn("❌ Ошибка авторизации, сброс токена");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // 🔐 Авторизация
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);

    // ✅ Редиректим в личный кабинет после входа
    navigate("/account");
  };

  // 🚪 Выход
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("migrated");
    setToken(null);
    setUser(null);

    // 🔄 Редиректим на страницу входа
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
