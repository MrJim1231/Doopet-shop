import express from "express";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// 💖 Получить все избранные для пользователя
router.get("/:userId", getFavorites);

// 💫 Добавить / удалить из избранного (toggle)
router.post("/", toggleFavorite);

// 🔍 Проверить, находится ли товар в избранном
router.get("/check/:userId/:productId", isFavorite);

export default router;
