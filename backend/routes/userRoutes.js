import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// 👤 Получить профиль текущего пользователя
router.get("/profile", auth, getProfile);

// 👥 Получить всех пользователей
router.get("/", auth, getUsers);

// 🔍 Получить пользователя по ID
router.get("/:id", auth, getUserById);

// ➕ Создать нового пользователя
router.post("/", createUser);

// ✏️ Обновить пользователя
router.put("/:id", auth, updateUser);

// ❌ Удалить пользователя
router.delete("/:id", auth, deleteUser);

// 🔐 Логин
router.post("/login", loginUser);

export default router;
