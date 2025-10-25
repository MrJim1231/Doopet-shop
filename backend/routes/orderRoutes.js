import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/ordersController.js";

const router = express.Router();

// 🛒 Создать заказ
router.post("/", createOrder);

// 📦 Получить все заказы
router.get("/", getOrders);

// 🔍 Получить один заказ по ID
router.get("/:id", getOrderById);

// 🔁 Обновить статус заказа
router.put("/:id/status", updateOrderStatus);

export default router;
