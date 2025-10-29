import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        // 🔁 После успешного входа переносим корзину и заказы (если нужно)
        const sessionId = localStorage.getItem("sessionId");
        const migrated = localStorage.getItem("migrated") === "true";

        if (sessionId && !migrated) {
          try {
            console.log("🟢 Миграция корзины и заказов...");
            await axios.post(
              "http://localhost:5000/api/cart/migrate",
              { sessionId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            await axios.post(
              "http://localhost:5000/api/orders/migrate",
              { sessionId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("✅ Миграция завершена");
            localStorage.setItem("migrated", "true");
          } catch (err) {
            console.error("❌ Ошибка миграции:", err);
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
