import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/scss/main.scss";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ авторизация
import { CartProvider } from "./context/CartContext.jsx"; // ✅ корзина

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
