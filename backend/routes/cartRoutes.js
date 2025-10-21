const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// CRUD корзины
router.get("/", getCart); // получить корзину
router.post("/add", addToCart); // добавить товар
router.put("/update", updateQuantity); // обновить количество
router.delete("/remove", removeFromCart); // удалить товар
router.delete("/clear", clearCart); // очистить корзину

module.exports = router;
