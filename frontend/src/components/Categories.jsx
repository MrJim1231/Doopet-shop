import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../utils/image";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // хук для перехода

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

  const handleClick = (id) => {
    navigate(`/category/${id}`); // переход на страницу с конкретной категорией
  };

  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__items">
          {categories.length === 0 ? (
            <p>Категории не найдены</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="categories__item"
                onClick={() => handleClick(cat._id)}
                style={{ cursor: "pointer" }} // курсор при наведении
              >
                <div className="categories__image-wrapper">
                  <img
                    src={getImageUrl(cat.image || cat.imageUrl) || "https://via.placeholder.com/150"}
                    alt={cat.name}
                    className="categories__image"
                  />
                </div>
                <p className="categories__title">{cat.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;
