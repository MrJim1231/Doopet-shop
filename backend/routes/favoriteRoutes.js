const express = require("express");
const router = express.Router();
const {
  getFavorites,
  toggleFavorite,
  isFavorite,
} = require("../controllers/favoriteController");

// 🔹 Получить все избранные для пользователя
router.get("/:userId", getFavorites);

// 🔹 Добавить / удалить из избранного (toggle)
router.post("/", toggleFavorite);

// 🔹 Проверить, находится ли товар в избранном
router.get("/check/:userId/:productId", isFavorite);

module.exports = router;
