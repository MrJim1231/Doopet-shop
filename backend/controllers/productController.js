import Product from "../models/Product.js";
import Category from "../models/Category.js";
import path from "path";

// 🟢 Получить все продукты (с фильтрами, пагинацией и сортировкой)
export const getProducts = async (req, res) => {
  try {
    const filter = {};

    // 🔹 Категория
    if (req.query.category) {
      filter.categoryId = req.query.category;
    }

    // 🔹 Цена (диапазон)
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      filter.price = {};
      if (!isNaN(minPrice)) filter.price.$gte = minPrice;
      if (!isNaN(maxPrice)) filter.price.$lte = maxPrice;
    }

    // 🔹 Производитель
    if (req.query.manufacturer) {
      const manufacturers = req.query.manufacturer
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
      if (manufacturers.length > 0) {
        filter.manufacturer = { $in: manufacturers };
      }
    }

    // 🔹 Размер упаковки
    if (req.query.packageSize) {
      const sizes = req.query.packageSize
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (sizes.length > 0) {
        filter.packageSize = { $in: sizes };
      }
    }

    // 🔹 Фильтр по тегу (например, ?tag=Хит)
    if (req.query.tag) {
      filter.tag = req.query.tag.trim();
    }

    // 🔹 Пагинация
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 12, 1);
    const skip = (page - 1) * limit;

    // 🔹 Сортировка
    const sortParam = req.query.sort || "default";
    let sortOption = {};
    switch (sortParam) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "name_asc":
        sortOption = { name: 1 };
        break;
      case "name_desc":
        sortOption = { name: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // 🔹 Получаем продукты
    const products = await Product.find(filter)
      .populate("categoryId")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Получить продукт по ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (!product) {
      return res.status(404).json({ message: "Продукт не найден" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Ошибка при получении продукта:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Создать новый продукт
export const createProduct = async (req, res) => {
  try {
    const body = req.body || {};
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      oldPrice,
      tag,
      label,
      manufacturer,
      packageSize,
      article,
    } = body;

    if (!name || !description || !price || !stock || !categoryId) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните все обязательные поля" });
    }

    if (isNaN(price) || isNaN(stock) || (oldPrice && isNaN(oldPrice))) {
      return res.status(400).json({
        message: "Цена, старая цена и количество должны быть числами",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Категория не найдена" });
    }

    // 🟢 Путь к изображению
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (body.image && body.image.startsWith("http")) {
      imagePath = body.image;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      oldPrice: oldPrice || 0,
      stock,
      categoryId,
      image: imagePath,
      tag: tag ?? "",
      label: label ?? "",
      manufacturer: manufacturer ?? "",
      packageSize: packageSize ?? "",
      article: article ?? undefined,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Ошибка при создании продукта:", error);
    res.status(500).json({ message: "Ошибка сервера при создании продукта" });
  }
};

// 🟢 Обновить продукт
export const updateProduct = async (req, res) => {
  try {
    const body = req.body || {};
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      oldPrice,
      tag,
      label,
      manufacturer,
      packageSize,
      article,
    } = body;

    const updateData = {
      name,
      description,
      price,
      oldPrice: oldPrice || 0,
      stock,
      categoryId,
      tag: tag || "",
      label: label || "",
      manufacturer: manufacturer || "",
      packageSize: packageSize || "",
      article: article || undefined,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (body.image && body.image.startsWith("http")) {
      updateData.image = body.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Продукт не найден" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Удалить продукт
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Продукт не найден" });
    }
    res.status(200).json({ message: "Продукт успешно удален" });
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Получить последние 8 товаров с тегом "Хит"
export const getHitProducts = async (req, res) => {
  try {
    const hits = await Product.find({ tag: "Хит" })
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json(hits);
  } catch (error) {
    console.error("Ошибка при получении хитов:", error);
    res.status(500).json({ message: "Ошибка при получении хитов" });
  }
};

// 🔹 Рекомендуемые товары (например, label: "Новинка")
export const getRecommendedProducts = async (req, res) => {
  try {
    const recommended = await Product.find({ label: "Новинка" })
      .sort({ createdAt: -1 })
      .limit(8);
    res.status(200).json(recommended);
  } catch (error) {
    console.error("Ошибка при получении рекомендуемых товаров:", error);
    res.status(500).json({ message: "Ошибка при получении рекомендуемых" });
  }
};
