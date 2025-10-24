const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

// 🔹 Получить все избранные товары пользователя
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Не указан userId" });
    }

    const favorites = await Favorite.find({ userId }).populate("productId");
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Ошибка при получении избранных:", error);
    res.status(500).json({ message: "Ошибка при получении избранных" });
  }
};

// 🔹 Добавить или удалить из избранного (toggle)
const toggleFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Не передан userId или productId" });
    }

    const existing = await Favorite.findOne({ userId, productId });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      return res
        .status(200)
        .json({ message: "Удалено из избранного", isFavorite: false });
    } else {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Товар не найден" });

      const favorite = new Favorite({ userId, productId });
      await favorite.save();
      return res
        .status(201)
        .json({ message: "Добавлено в избранное", isFavorite: true });
    }
  } catch (error) {
    console.error("Ошибка при изменении избранного:", error);
    res.status(500).json({ message: "Ошибка при изменении избранного" });
  }
};

// 🔹 Проверить, находится ли товар в избранном
const isFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const exists = await Favorite.findOne({ userId, productId });
    res.status(200).json({ isFavorite: !!exists });
  } catch (error) {
    console.error("Ошибка при проверке избранного:", error);
    res.status(500).json({ message: "Ошибка при проверке избранного" });
  }
};

module.exports = { getFavorites, toggleFavorite, isFavorite };
