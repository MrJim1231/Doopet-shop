const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ добавили роут заказов

const app = express();
const PORT = process.env.PORT || 5000;

// Разрешаем кросс-доменные запросы
app.use(cors());

// Подключение к базе данных MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Подключение к базе данных успешно"))
  .catch((error) => console.log("Ошибка подключения к базе данных:", error));

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Роуты
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes); // ✅ добавляем маршрут для заказов

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
