const Product = require("../models/product");
const Category = require("../models/category");

// Получить все продукты (с фильтром по категории, если указан)
const getProducts = async (req, res) => {
  try {
    const filter = {};

    // если передан query-параметр category, фильтруем по categoryId
    if (req.query.category) {
      filter.categoryId = req.query.category;
    }

    const products = await Product.find(filter).populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Создать новый продукт
const createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId, image } = req.body;

  if (!name || !description || !price || !stock || !categoryId) {
    return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
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

  const newProduct = new Product({
    name,
    description,
    price,
    stock,
    categoryId,
    image,
  });

  try {
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Обновить продукт
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Продукт не найден" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
