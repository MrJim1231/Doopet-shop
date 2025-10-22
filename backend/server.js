const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

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
  console.log("Папка uploads создана");
}

// ✅ Раздаём папку uploads как статическую
app.use("/uploads", express.static(uploadDir));

// ✅ Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Подключение к базе данных успешно"))
  .catch((error) => console.log("Ошибка подключения к базе данных:", error));

// ✅ Основные маршруты
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на порту ${PORT}`);
});
