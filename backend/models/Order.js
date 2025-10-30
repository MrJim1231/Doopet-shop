import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Может быть пустым для гостей
    },
    sessionId: {
      type: String, // Для гостей
      required: false,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Цена на момент покупки
        totalPrice: { type: Number, required: true }, // quantity * price
      },
    ],

    total: { type: Number, required: true }, // Общая сумма заказа

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },

    // 👤 Информация о клиенте
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      region: { type: String, required: false },
      zip: { type: String, required: false },
    },

    // 💬 Дополнительные поля заказа
    comment: { type: String, required: false, trim: true },
    delivery: { type: String, required: true, default: "fixed" }, // fixed, courier и т.п.
    payment: { type: String, required: true, default: "cash" }, // cash, card, etc.
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
