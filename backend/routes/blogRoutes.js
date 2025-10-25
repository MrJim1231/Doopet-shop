const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// 📂 Настройка хранилища для загрузок
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для сохранения
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // имя файла
  },
});

// Проверка типа файла (опционально)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Недопустимый формат файла"), false);
};

const upload = multer({ storage, fileFilter });

// 🟢 Маршруты
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("image"), createBlog); // загрузка нового поста
router.put("/:id", upload.single("image"), updateBlog); // обновление поста
router.delete("/:id", deleteBlog); // удаление поста

module.exports = router;
