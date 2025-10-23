import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/scss/main.scss";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // 🟢 импорт контекста корзины

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
