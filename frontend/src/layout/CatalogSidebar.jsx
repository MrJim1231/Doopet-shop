import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function CatalogSidebar({ open, onClose }) {
  const [categories, setCategories] = useState([]);

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке категорий:", err);
      }
    };
    fetchCategories();
  }, []);

  // Блокируем скролл при открытии
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Оверлей */}
      <div className="catalog-sidebar__overlay" onClick={onClose}></div>

      {/* Сайдбар */}
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar__header">
          <h3>Категории</h3>
          <button className="catalog-sidebar__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <ul className="catalog-sidebar__list">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat._id} className="catalog-sidebar__item">
                <Link
                  to={`/category/${cat._id}`}
                  className="catalog-sidebar__link"
                  onClick={onClose}
                >
                  {cat.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="catalog-sidebar__empty">Нет категорий</li>
          )}
        </ul>
      </aside>
    </>
  );
}

export default CatalogSidebar;
