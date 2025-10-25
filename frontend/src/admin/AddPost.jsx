import React, { useState } from "react";

function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.image
    ) {
      setStatus("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Статья успешно добавлена!");
        setFormData({ title: "", description: "", date: "", image: "" });
      } else {
        setStatus("Ошибка при добавлении статьи.");
      }
    } catch (err) {
      setStatus("Сервер недоступен.");
    }
  };

  return (
    <div className="add-post">
      <h2>Добавить статью</h2>
      <form onSubmit={handleSubmit} className="add-post__form">
        <label>
          Заголовок:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Краткое описание:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>

        <label>
          Дата:
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="например, 25 окт, 2025"
            required
          />
        </label>

        <label>
          Ссылка на изображение:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Добавить</button>

        {status && <p className="add-post__status">{status}</p>}
      </form>
    </div>
  );
}

export default AddPost;
