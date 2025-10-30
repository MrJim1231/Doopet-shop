import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      default: "",
    },

    // 📦 Старое поле address можно оставить для совместимости
    address: {
      type: String,
      default: "",
    },

    // 📍 Массив адресов для страницы "Мои адреса"
    addresses: [
      {
        address: { type: String, required: true },
        city: { type: String, required: true },
        region: { type: String },
        zip: { type: String },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      },
    ],

    // 🔁 Для восстановления пароля
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
