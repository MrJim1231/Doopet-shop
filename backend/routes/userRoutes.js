// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

// Получить профиль текущего пользователя
router.get("/profile", auth, getProfile);

// Получить всех пользователей
router.get("/", auth, getUsers);

// Получить пользователя по ID
router.get("/:id", auth, getUserById);

// Создать нового пользователя
router.post("/", createUser);

// Обновить пользователя
router.put("/:id", auth, updateUser);

// Удалить пользователя
router.delete("/:id", auth, deleteUser);

// Логин
router.post("/login", loginUser);

module.exports = router;
