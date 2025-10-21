const mongoose = require("mongoose");

// Модель категории
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Уникальность для имени
      trim: true, // Убирает лишние пробелы
    },
    description: {
      type: String,
      required: false, // Это поле не обязательно для заполнения
      trim: true, // Убирает лишние пробелы
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

// Экспортируем модель категории
// const Category = mongoose.model("Category", categorySchema);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
