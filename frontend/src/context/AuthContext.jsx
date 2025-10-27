import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🔹 при наличии токена получаем профиль
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          setUser(res.data);

          // 🔁 После успешного получения профиля запускаем миграцию
          const sessionId = localStorage.getItem("sessionId");
          const migrated = localStorage.getItem("migrated") === "true";

          if (sessionId && !migrated) {
            try {
              console.log("🟢 Запуск миграции корзины и заказов...");

              // 🛒 Перенос корзины
              await axios.post(
                "http://localhost:5000/api/cart/migrate",
                { sessionId },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              // 📦 Перенос заказов
              await axios.post(
                "http://localhost:5000/api/orders/migrate",
                { sessionId },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              console.log("✅ Миграция корзины и заказов завершена.");
              localStorage.setItem("migrated", "true");
            } catch (err) {
              console.error("❌ Ошибка миграции:", err);
            }
          }
        })
        .catch(() => logout());
    }
  }, [token]);

  // 🔐 Авторизация
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  // 🚪 Выход
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("migrated"); // при выходе сбрасываем флаг
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ экспорт хука
export const useAuth = () => useContext(AuthContext);
