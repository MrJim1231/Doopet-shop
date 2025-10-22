import { useEffect, useState } from "react";
import axios from "axios";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
// import "../styles/AddProduct.scss";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🟢 Загружаем категории и продукты при монтировании
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  // Изменение инпутов
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🟢 Добавление продукта
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price || !form.stock || !form.categoryId) {
      return alert("Заполните обязательные поля!");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (file) formData.append("image", file);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        image: "",
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

  // 🗑 Удаление продукта
  const handleDelete = async (id) => {
    if (!window.confirm("Удалить продукт?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении продукта");
    }
  };

  return (
    <>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Добавить продукт" }]} />

      <section className="add-product">
        <div className="add-product__container">
          <h2 className="add-product__title">Добавить продукт</h2>

          <form className="add-product__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Название продукта"
              className="add-product__input"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Описание продукта"
              className="add-product__input"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="Цена"
              className="add-product__input"
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
              placeholder="Количество на складе"
              className="add-product__input"
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleInputChange}
              className="add-product__input"
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

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
                        src={
                          p.image.startsWith("http")
                            ? p.image
                            : `http://localhost:5000${p.image}`
                        }
                        alt={p.name}
                        className="add-product__img"
                      />
                    )}
                    <div>
                      <h4>{p.name}</h4>
                      <p>Цена: {p.price} грн</p>
                      <p>Остаток: {p.stock}</p>
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
