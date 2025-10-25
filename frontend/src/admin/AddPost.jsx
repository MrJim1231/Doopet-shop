import { useState } from "react";
import axios from "axios";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";

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

      await axios.post("http://localhost:5000/api/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ Статья успешно добавлена!");
      setForm({ title: "", description: "", date: "", imageUrl: "" });
      setFile(null);
    } catch (err) {
      setStatus("Ошибка при добавлении статьи.");
    } finally {
      setLoading(false);
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
        </div>
      </div>
    </>
  );
}

export default AddPost;
