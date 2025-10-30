import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Импорт роутов
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

// 📁 Получаем __dirname (в ES-модулях его нет)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Разрешаем кросс-доменные запросы
app.use(cors());

// ✅ Middleware для парсинга JSON
app.use(bodyParser.json());

// ✅ Проверяем наличие папки uploads, создаём если нет
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📂 Папка uploads создана");
}

// ✅ Раздаём папку uploads как статическую
app.use("/uploads", express.static(uploadDir));

// ✅ Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Подключение к базе данных успешно"))
  .catch((error) =>
    console.error("❌ Ошибка подключения к базе данных:", error)
  );

// ✅ Подключение маршрутов
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/addresses", addressRoutes);

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на порту ${PORT}`);
});
