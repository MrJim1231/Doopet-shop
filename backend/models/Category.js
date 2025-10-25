import mongoose from "mongoose";

// 🟢 Модель категории
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
      trim: true,
      default: "",
    },
    image: {
      type: String, // Может быть URL или локальный путь (например: /uploads/123.jpg)
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
categorySchema.virtual("imageUrl").get(function () {
  if (!this.image) return "";
  if (this.image.startsWith("http")) return this.image; // Если это ссылка — возвращаем как есть

  // Иначе формируем полный путь к локальному файлу
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  return `${baseUrl}${this.image}`;
});

// ✅ Экспорт модели
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
