// scripts/resetArticles.js
require("dotenv").config();
const mongoose = require("mongoose");
// const colors = require("colors");
const Product = require("../models/Product");

(async () => {
  try {
    console.log("⏳ Подключение к MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Подключено к MongoDB".green);

    // Получаем все товары
    const products = await Product.find();
    console.log(`📦 Найдено товаров: ${products.length}`);

    let updatedCount = 0;

    for (const product of products) {
      // 🆕 Генерируем новый случайный артикул
      const newArticle = "PRD-" + Math.floor(100000 + Math.random() * 900000);

      await Product.updateOne(
        { _id: product._id },
        { $set: { article: newArticle } }
      );

      console.log(`🔹 ${product.name} → ${newArticle}`);
      updatedCount++;
    }

    console.log(
      `\n✅ Готово! Артикулы обновлены для ${updatedCount} товаров`.cyan
    );
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при обновлении артикулов:", error);
    mongoose.connection.close();
  }
})();
