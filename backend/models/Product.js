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
      type: String, // Может быть URL или локальный путь (/uploads/...)
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt и updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Виртуальное поле для полного URL изображения
productSchema.virtual("imageUrl").get(function () {
  if (!this.image) return "";
  if (this.image.startsWith("http")) return this.image; // Если ссылка — возвращаем как есть

  // Иначе формируем полный путь к локальному файлу
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  return `${baseUrl}${this.image}`;
});

// ✅ Экспорт модели
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
