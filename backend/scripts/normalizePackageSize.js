// scripts/normalizePackageSize.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // путь к модели

(async () => {
  try {
    console.log("⏳ Подключение к MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Подключено к MongoDB".green);

    // Получаем все товары
    const products = await Product.find();
    let updatedCount = 0;

    for (const product of products) {
      if (
        product.packageSize &&
        !product.packageSize.toString().includes("kg")
      ) {
        const newSize = product.packageSize.toString().trim() + "kg";
        await Product.updateOne(
          { _id: product._id },
          { $set: { packageSize: newSize } }
        );
        console.log(
          `🔹 Обновлён: ${product.name} (${product.packageSize} → ${newSize})`
        );
        updatedCount++;
      }
    }

    console.log(`\n✅ Готово! Обновлено товаров: ${updatedCount}`.cyan);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при нормализации:", error);
    mongoose.connection.close();
  }
})();
