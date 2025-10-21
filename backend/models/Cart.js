const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true, // Цена на момент добавления в корзину
        },
        totalPrice: {
          type: Number,
          required: true, // quantity * price
        },
      },
    ],
    sessionId: {
      type: String, // Для гостей
      required: false,
    },
    cartTotal: {
      type: Number,
      required: true,
      default: 0, // Общая сумма всех товаров
    },
  },
  { timestamps: true }
);

// Перед сохранением автоматически считаем totalPrice для каждого товара и cartTotal
cartSchema.pre("save", function (next) {
  this.cartTotal = 0;
  this.items.forEach((item) => {
    item.totalPrice = item.price * item.quantity;
    this.cartTotal += item.totalPrice;
  });
  next();
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = Cart;
