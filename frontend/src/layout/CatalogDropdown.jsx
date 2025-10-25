import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CatalogDropdown() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке категорий:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🟢 Главные категории (без parentId)
  const mainCategories = categories.filter((cat) => !cat.parentId);

  // 🟢 Подкатегории (с parentId)
  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parentId === parentId);

  return (
    <div className="catalog-dropdown">
      <ul className="catalog-dropdown__menu">
        {mainCategories.length > 0 ? (
          mainCategories.map((cat) => {
            const subcats = getSubcategories(cat._id);
            return (
              <li
                key={cat._id}
                className="catalog-dropdown__item"
                onMouseEnter={() => setActiveCategory(cat._id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <span className="catalog-dropdown__link">
                  {cat.name}
                  <span className="catalog-dropdown__arrow">›</span>
                </span>

                {/* Подменю */}
                {activeCategory === cat._id && (
                  <ul className="catalog-dropdown__submenu">
                    {subcats.length > 0 ? (
                      subcats.map((sub) => (
                        <li key={sub._id}>
                          <Link
                            to={`/category/${sub._id}`}
                            className="catalog-dropdown__submenu-link"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <Link
                          to={`/category/${cat._id}`}
                          className="catalog-dropdown__submenu-link"
                        >
                          Все товары категории
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            );
          })
        ) : (
          <li className="catalog-dropdown__empty">Нет категорий</li>
        )}
      </ul>
    </div>
  );
}

export default CatalogDropdown;
