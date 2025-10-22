const Product = require("../models/product");
const Category = require("../models/category");
const path = require("path");

// Получить все продукты (с фильтром по категории, если указан)
const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.categoryId = req.query.category;
    }

    const products = await Product.find(filter).populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    res.status(500).json({ message: error.message });
  }
};

// Получить продукт по ID
const getProductById = async (req, res) => {
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

// Создать новый продукт (с загрузкой изображения)
const createProduct = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    const body = req.body || {};
    const { name, description, price, stock, categoryId } = body;

    if (!name || !description || !price || !stock || !categoryId) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните все поля" });
    }

    if (isNaN(price) || isNaN(stock)) {
      return res
        .status(400)
        .json({ message: "Цена и количество должны быть числами" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Категория не найдена" });
    }

    // 🟢 Определяем путь к изображению
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
      stock,
      categoryId,
      image: imagePath,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Ошибка при создании продукта:", error);
    res.status(500).json({ message: "Ошибка сервера при создании продукта" });
  }
};

// Обновить продукт
const updateProduct = async (req, res) => {
  try {
    const body = req.body || {};
    const { name, description, price, stock, categoryId } = body;

    const updateData = {
      name,
      description,
      price,
      stock,
      categoryId,
    };

    // 🟢 Обновляем изображение, если загружено новое
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (body.image && body.image.startsWith("http")) {
      updateData.image = body.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
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

// Удалить продукт
const deleteProduct = async (req, res) => {
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

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
