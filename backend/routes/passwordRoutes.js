import express from "express";
import {
  changePassword,
  requestPasswordReset,
  resetPassword,
} from "../controllers/passwordController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Смена пароля (авторизованный пользователь)
router.post("/change", auth, changePassword);

// 🔁 Запрос восстановления
router.post("/request-reset", requestPasswordReset);

// ✅ Сброс пароля по токену
router.post("/reset/:token", resetPassword);

export default router;
