import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "", // ссылка или пусто
  });
  const [file, setFile] = useState(null); // 🟢 локальный файл
  const [loading, setLoading] = useState(false);

  // Загружаем все категории
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  // Изменение текстовых полей
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Изменение файла
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Добавление категории
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Введите название категории");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      // 🟢 Если выбран файл — отправляем файл, иначе URL
      if (file) {
        formData.append("image", file);
      } else if (form.image.trim()) {
        formData.append("image", form.image);
      }

      await axios.post(`${API_URL}/api/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Сброс формы
      setForm({ name: "", description: "", image: "" });
      setFile(null);
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Ошибка при добавлении категории");
    } finally {
      setLoading(false);
    }
  };

  // Удаление категории
  const handleDelete = async (id) => {
    if (!window.confirm("Удалить категорию?")) return;
    try {
      await axios.delete(`${API_URL}/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      alert("Ошибка при удалении категории");
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Добавить категорию" }]} />

      <div className="add-category">
        <div className="add-category__container">
          <h2 className="add-category__title">Добавить категорию</h2>

          <form className="add-category__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Название категории"
              className="add-category__input"
            />
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Описание (необязательно)"
              className="add-category__input"
            />

            <div className="add-category__upload">
              <label className="add-category__label">
                <span>Загрузить изображение (файл или URL):</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="add-category__input"
              />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleInputChange}
                placeholder="URL изображения (если не загружаете файл)"
                className="add-category__input"
              />
            </div>

            <button
              type="submit"
              className="add-category__btn"
              disabled={loading}
            >
              {loading ? "Добавление..." : "Добавить"}
            </button>
          </form>

          <h3 className="add-category__subtitle">Список категорий</h3>

          <div className="add-category__list">
            {categories.length === 0 ? (
              <p className="add-category__empty">Категорий нет</p>
            ) : (
              categories.map((cat) => (
                <div key={cat._id} className="add-category__item">
                  <div className="add-category__info">
                    {cat.image && (
                      <img
                        src={
                          cat.image.startsWith("http")
                            ? cat.image
                            : `http://localhost:5000${cat.image}`
                        }
                        alt={cat.name}
                        className="add-category__img"
                      />
                    )}
                    <div>
                      <h4>{cat.name}</h4>
                      {cat.description && <p>{cat.description}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="add-category__delete"
                  >
                    ✕
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

export default AddCategory;
