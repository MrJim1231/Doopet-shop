import { useEffect, useState } from "react";
import axios from "axios";
// import "./AddCategory.scss";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);

  // Получаем все категории при загрузке
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Добавление категории
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Введите название категории");

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/categories", form);
      setForm({ name: "", description: "", image: "" });
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
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      alert("Ошибка при удалении категории");
    }
  };

  return (
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
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleInputChange}
            placeholder="URL изображения"
            className="add-category__input"
          />
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
                      src={cat.image}
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
  );
}

export default AddCategory;
