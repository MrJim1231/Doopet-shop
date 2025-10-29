import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
  updateProfile, // 🆕 добавили новый контроллер
} from "../controllers/userController.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// 👤 Получить профиль текущего пользователя
router.get("/profile", auth, getProfile);

// ✏️ Обновить профиль текущего пользователя
router.put("/profile", auth, updateProfile); // ✅ новое действие

// 👥 Получить всех пользователей (для админа)
router.get("/", auth, getUsers);

// 🔍 Получить пользователя по ID
router.get("/:id", auth, getUserById);

// ➕ Создать нового пользователя (регистрация)
router.post("/", createUser);

// ✏️ Обновить пользователя по ID (для админа)
router.put("/:id", auth, updateUser);

// ❌ Удалить пользователя
router.delete("/:id", auth, deleteUser);

// 🔐 Логин
router.post("/login", loginUser);

export default router;
