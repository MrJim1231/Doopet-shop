const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// 🟢 Настройка multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

// Роуты
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// 🟢 ВАЖНО: Multer ДО контроллера!
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
