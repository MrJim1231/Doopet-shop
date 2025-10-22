const Category = require("../models/category");
const path = require("path");

// Получить все категории
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получить категорию по ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать новую категорию
const createCategory = async (req, res) => {
  try {
    // 🟢 Проверка: если req.body пустой — создаём пустой объект
    const body = req.body || {};
    const { name, description, image } = body;

    if (!name) {
      return res.status(400).json({ message: "Введите имя категории" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Категория уже существует" });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (image && image.startsWith("http")) {
      imagePath = image;
    }

    const newCategory = new Category({
      name,
      description,
      image: imagePath,
    });

    const createdCategory = await newCategory.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Ошибка при создании категории:", error);
    res.status(500).json({ message: "Ошибка сервера при создании категории" });
  }
};

// Обновить категорию
const updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удалить категорию
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }
    res.status(200).json({ message: "Категория успешно удалена" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
