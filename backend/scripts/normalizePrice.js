// scripts/normalizePrice.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

(async () => {
  try {
    console.log("⏳ Подключение к MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Подключено к базе");

    const products = await Product.find();
    let updatedCount = 0;

    for (const product of products) {
      if (typeof product.price === "string") {
        const numeric = parseFloat(product.price.replace(",", "."));
        if (!isNaN(numeric)) {
          await Product.updateOne(
            { _id: product._id },
            { $set: { price: numeric } }
          );
          console.log(`💰 ${product.name}: ${product.price} → ${numeric}`);
          updatedCount++;
        }
      }
    }

    console.log(`\n✅ Обновлено ${updatedCount} товаров`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при обновлении:", error);
    mongoose.connection.close();
  }
})();
