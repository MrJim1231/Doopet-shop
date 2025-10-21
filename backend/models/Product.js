const mongoose = require("mongoose");

// Модель продукта
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Убирает лишние пробелы
    },
    description: {
      type: String,
      required: true,
      trim: true, // Убирает лишние пробелы
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Цена не может быть отрицательной
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Количество не может быть отрицательным
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Связь с моделью Category
      required: true,
    },
    image: {
      type: String, // Ссылка на изображение
      required: false, // Это поле не обязательно для заполнения
      trim: true, // Убирает лишние пробелы
    },
  },
  {
    timestamps: true, // Автоматически добавляет поля createdAt и updatedAt
  }
);

// Экспортируем модель продукта
// const Product = mongoose.model("Product", productSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
