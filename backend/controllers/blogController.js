import Blog from "../models/Blog.js";
import path from "path";

// 🟢 Получить все записи блога
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении списка блогов",
      error: error.message,
    });
  }
};

// 🟢 Получить запись по ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Блог не найден" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении блога",
      error: error.message,
    });
  }
};

// 🟢 Создать новую запись блога
export const createBlog = async (req, res) => {
  try {
    const body = req.body || {};
    const { title, description, date, image } = body;

    if (!title) {
      return res.status(400).json({ message: "Введите заголовок статьи" });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (image && image.startsWith("http")) {
      imagePath = image;
    }

    const newBlog = new Blog({
      title,
      description,
      date,
      image: imagePath,
    });

    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error("Ошибка при создании блога:", error);
    res.status(500).json({ message: "Ошибка сервера при создании блога" });
  }
};

// 🟢 Обновить блог
export const updateBlog = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Блог не найден" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении блога",
      error: error.message,
    });
  }
};

// 🟢 Удалить блог
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Блог не найден" });
    }
    res.status(200).json({ message: "Блог успешно удалён" });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении блога",
      error: error.message,
    });
  }
};
