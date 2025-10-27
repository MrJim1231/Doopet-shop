import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  migrateOrders, // 🆕 добавили контроллер миграции
} from "../controllers/ordersController.js";

import auth from "../middleware/authMiddleware.js"; // 🛡️ подключаем защиту токеном

const router = express.Router();

// 🛒 Создать заказ
router.post("/", createOrder);

// 📦 Получить все заказы (для админа)
router.get("/", auth, getOrders);

// 🔍 Получить один заказ по ID
router.get("/:id", auth, getOrderById);

// 🔁 Обновить статус заказа
router.put("/:id/status", auth, updateOrderStatus);

// 🔄 🆕 Перенести заказы из гостя в пользователя после авторизации
router.post("/migrate", auth, migrateOrders);

export default router;
