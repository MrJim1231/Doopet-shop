import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import { getImageUrl } from "../utils/image";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    categoryId: "",
    tag: "",
    label: "",
    manufacturer: "",
    packageSize: "",
    image: "",
    article: "", // 🟢 добавлено поле
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const generateArticle = () => {
    return "PRD-" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price || !form.stock || !form.categoryId) {
      return alert("Заполните обязательные поля!");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // 🟢 если пользователь не ввёл артикул — создаём автоматически
      const articleValue = form.article.trim() || generateArticle();

      for (const key in form) {
        if (key !== "article") formData.append(key, form[key]);
      }
      formData.append("article", articleValue);

      if (file) formData.append("image", file);

      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        stock: "",
        categoryId: "",
        tag: "",
        label: "",
        manufacturer: "",
        packageSize: "",
        image: "",
        article: "", // сбрасываем
      });
      setFile(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Ошибка при добавлении продукта");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить продукт?")) return;

    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении продукта");
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Добавить продукт" }]} />

      <section className="add-product">
        <div className="add-product__container">
          <h2 className="add-product__title">Добавить продукт</h2>

          <form className="add-product__form" onSubmit={handleSubmit}>
            <div className="add-product__group">
              <label>Название товара *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="add-product__input"
              />
            </div>
            <div className="add-product__group">
              <label>Описание</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="add-product__input"
              />
            </div>
            <div className="add-product__row">
              <div className="add-product__group">
                <label>Цена *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleInputChange}
                  required
                  className="add-product__input"
                />
              </div>
              <div className="add-product__group">
                <label>Старая цена</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleInputChange}
                  className="add-product__input"
                />
              </div>
            </div>
            <div className="add-product__row">
              <div className="add-product__group">
                <label>Количество на складе *</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleInputChange}
                  required
                  className="add-product__input"
                />
              </div>
              <div className="add-product__group">
                <label>Категория *</label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleInputChange}
                  required
                  className="add-product__input"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="add-product__row">
              <div className="add-product__group">
                <label>Тэг (например 'Хит')</label>
                <input
                  type="text"
                  name="tag"
                  value={form.tag}
                  onChange={handleInputChange}
                  className="add-product__input"
                />
              </div>
              <div className="add-product__group">
                <label>Лейбл (например 'Новинка')</label>
                <input
                  type="text"
                  name="label"
                  value={form.label}
                  onChange={handleInputChange}
                  className="add-product__input"
                />
              </div>
            </div>
            <div className="add-product__row">
              <div className="add-product__group">
                <label>Производитель</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={form.manufacturer}
                  onChange={handleInputChange}
                  className="add-product__input"
                />
              </div>
              <div className="add-product__group">
                <label>Размер упаковки</label>
                <input
                  type="text"
                  name="packageSize"
                  value={form.packageSize}
                  onChange={handleInputChange}
                  className="add-product__input"
                />
              </div>
            </div>

            <div className="add-product__group">
              <label>Артикул (оставьте пустым для автогенерации)</label>
              <input
                type="text"
                name="article"
                value={form.article}
                onChange={handleInputChange}
                className="add-product__input"
              />
            </div>

            <div className="add-product__upload">
              <label>Изображение:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="add-product__input"
              />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleInputChange}
                placeholder="URL изображения (если не загружаете файл)"
                className="add-product__input"
              />
            </div>

            <button
              type="submit"
              className="add-product__btn"
              disabled={loading}
            >
              {loading ? "Добавление..." : "Добавить продукт"}
            </button>
          </form>

          <h3 className="add-product__subtitle">Список продуктов</h3>

          <div className="add-product__list">
            {products.length === 0 ? (
              <p className="add-product__empty">Продуктов нет</p>
            ) : (
              products.map((p) => (
                <div key={p._id} className="add-product__item">
                  <div className="add-product__info">
                    {p.image && (
                      <img
                        src={getImageUrl(p.image || p.imageUrl)}
                        alt={p.name}
                        className="add-product__img"
                      />
                    )}
                    <div>
                      <h4>{p.name}</h4>
                      <p>Цена: {p.price} грн</p>
                      {p.oldPrice && <p>Старая цена: {p.oldPrice} грн</p>}
                      <p>Остаток: {p.stock}</p>
                      {p.article && <p>Артикул: {p.article}</p>} {/* 🟢 */}
                      {p.tag && <p>Тэг: {p.tag}</p>}
                      {p.label && <p>Лейбл: {p.label}</p>}
                      {p.manufacturer && (
                        <p>
                          <strong>Производитель:</strong> {p.manufacturer}
                        </p>
                      )}
                      {p.packageSize && (
                        <p>
                          <strong>Размер упаковки:</strong> {p.packageSize}
                        </p>
                      )}
                      {p.categoryId && (
                        <p>
                          Категория:{" "}
                          {typeof p.categoryId === "object"
                            ? p.categoryId.name
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="add-product__delete"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AddProduct;
