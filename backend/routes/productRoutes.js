const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Получить все продукты с категориями
router.get("/", getProducts);

// Получить продукт по ID
router.get("/:id", getProductById);

// Создать новый продукт
router.post("/", createProduct);

// Обновить продукт
router.put("/:id", updateProduct);

// Удалить продукт
router.delete("/:id", deleteProduct);

module.exports = router;
