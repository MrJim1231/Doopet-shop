const mongoose = require("mongoose");

// Модель продукта
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    manufacturer: {
      type: String,
      trim: true,
      set: (v) => (v ? v.trim() : ""),
      default: "",
    },
    packageSize: {
      type: String,
      trim: true,
      default: "",
      set: (v) => (v ? v.toString().replace(/\s+/g, "").toLowerCase() : ""),
    },

    // 🆕 Артикул (SKU)
    article: {
      type: String,
      trim: true,
      unique: true,
      default: function () {
        // генерируем, если не задан вручную
        return "PRD-" + Math.floor(100000 + Math.random() * 900000);
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Полный URL изображения
productSchema.virtual("imageUrl").get(function () {
  if (!this.image) return "";
  if (this.image.startsWith("http")) return this.image;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  return `${baseUrl}${this.image}`;
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
