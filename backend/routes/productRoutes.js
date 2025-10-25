import express from "express";
import multer from "multer";
import path from "path";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getHitProducts,
  getRecommendedProducts,
} from "../controllers/productController.js";

const router = express.Router();

// 🟢 Настройка хранения изображений (uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

// 🟢 Фильтр: только изображения
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Можно загружать только изображения"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // максимум 5 МБ
});

// 🔹 Маршруты продуктов
router.get("/hits", getHitProducts); // ✅ до :id
router.get("/recommended", getRecommendedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
