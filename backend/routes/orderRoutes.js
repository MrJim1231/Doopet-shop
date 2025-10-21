const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/ordersController");

// Создать заказ
router.post("/", createOrder);

// Получить все заказы
router.get("/", getOrders);

// Получить один заказ по id
router.get("/:id", getOrderById);

// Обновить статус заказа
router.put("/:id/status", updateOrderStatus);

module.exports = router;
