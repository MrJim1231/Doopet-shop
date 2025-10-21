const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Получить все категории
router.get("/", getCategories);

// Получить категорию по ID
router.get("/:id", getCategoryById);

// Создать новую категорию
router.post("/", createCategory);

// Обновить категорию
router.put("/:id", updateCategory);

// Удалить категорию
router.delete("/:id", deleteCategory);

module.exports = router;
