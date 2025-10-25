import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).json({ error: "Not found" });
};

export const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  const saved = await newBlog.save();
  res.status(201).json(saved);
};

export const updateBlog = async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
