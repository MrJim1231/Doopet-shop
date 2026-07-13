import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import { getImageUrl } from "../utils/image";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]); // 🟢 список статей

  // 🟢 Загрузка всех статей при старте
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке статей:", err);
    }
  };

  // 🟢 изменение текстовых полей
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus("");
  };

  // 🟢 выбор файла
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  // 🟢 отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date) {
      setStatus("Пожалуйста, заполните все поля.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("date", form.date);

      if (file) {
        data.append("image", file);
      } else if (form.imageUrl) {
        data.append("image", form.imageUrl);
      }

      await axios.post(`${API_URL}/api/blogs`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ Статья успешно добавлена!");
      setForm({ title: "", description: "", date: "", imageUrl: "" });
      setFile(null);
      fetchBlogs(); // 🟢 обновляем список после добавления
    } catch (err) {
      setStatus("Ошибка при добавлении статьи.");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Удаление статьи
  const handleDelete = async (id) => {
    if (!window.confirm("Удалить эту статью?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Добавить статью" }]} />

      <div className="add-post">
        <div className="add-post__container">
          <h2 className="add-post__title">Добавить статью</h2>

          <form
            className="add-post__form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Заголовок статьи"
              className="add-post__input"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Краткое описание"
              rows="4"
              className="add-post__input"
            />
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Например: 25 окт, 2025"
              className="add-post__input"
            />

            <div className="add-post__upload">
              <label className="add-post__label">
                <span>Загрузить изображение (файл или URL):</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="add-post__input"
              />
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="URL изображения (если не загружаете файл)"
                className="add-post__input"
              />
            </div>

            <button type="submit" className="add-post__btn" disabled={loading}>
              {loading ? "Добавление..." : "Добавить"}
            </button>

            {status && <p className="add-post__status">{status}</p>}
          </form>

          {/* 🟢 Отображение всех статей */}
          <h3 className="add-post__subtitle">Список статей</h3>
          <div className="add-post__list">
            {blogs.length === 0 ? (
              <p>Пока нет статей</p>
            ) : (
              blogs.map((post) => (
                <div className="add-post__item" key={post._id}>
                  <div className="add-post__item-left">
                    <img
                      src={getImageUrl(post.imageUrl || post.image)}
                      alt={post.title}
                      className="add-post__item-img"
                    />
                    <div>
                      <h4>{post.title}</h4>
                      <p>{post.date}</p>
                    </div>
                  </div>
                  <button
                    className="add-post__delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPost;
