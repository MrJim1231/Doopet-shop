import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: String,
      trim: true,
      default: "",
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
blogSchema.virtual("imageUrl").get(function () {
  if (!this.image) return "";
  if (this.image.startsWith("http")) return this.image; // если это внешний URL — вернуть как есть

  // иначе формируем полный путь к локальному файлу
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  return `${baseUrl}${this.image.startsWith("/") ? "" : "/"}${this.image}`;
});

// ✅ Экспорт модели
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
