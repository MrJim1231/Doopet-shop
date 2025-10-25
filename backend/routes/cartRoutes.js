import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// 🛒 CRUD корзины
router.get("/", getCart); // получить корзину
router.post("/add", addToCart); // добавить товар
router.put("/update", updateQuantity); // обновить количество
router.delete("/remove", removeFromCart); // удалить товар
router.delete("/clear", clearCart); // очистить корзину

export default router;
