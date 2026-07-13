import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // 🔹 импорт контекста корзины
import graphicIcon from "../assets/icons/graphic-elements.svg";
import { getImageUrl } from "../utils/image";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // 🔹 локальное хранение количества
  const { addToCart } = useCart(); // 🔹 получаем функцию из контекста

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/hits`);
        setProducts(res.data || []);
      } catch (error) {
        console.error("Ошибка при загрузке хитов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHits();
  }, []);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const newQty = Math.max(1, current + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = async (productId) => {
    const qty = quantities[productId] || 1;
    await addToCart(productId, qty);
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <section className="popular">
      <div className="popular__container">
        <div className="popular__header">
          <img src={graphicIcon} alt="icon" className="popular__icon" />
          <h2 className="popular__title">Хиты продаж</h2>
        </div>

        <div className="popular__products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="popular__products-card">
                {/* ✅ Клик по изображению или названию → страница продукта */}
                <Link
                  to={`/product/${product._id}`}
                  className="popular__products-link"
                >
                  <div className="popular__products-image-wrapper">
                    <div className="popular__products-labels">
                      {product.tag && (
                        <span className="popular__products-label popular__products-label--hit">
                          {product.tag}
                        </span>
                      )}
                      {product.label && (
                        <span className="popular__products-label popular__products-label--new">
                          {product.label}
                        </span>
                      )}
                    </div>
                    <img
                      src={getImageUrl(product.image || product.imageUrl)}
                      alt={product.name}
                      className="popular__products-image"
                    />
                  </div>
                </Link>

                <div className="popular__products-info">
                  <h3 className="popular__products-name">{product.name}</h3>

                  <div className="popular__products-prices">
                    <span className="popular__products-price">
                      {product.price}€
                    </span>
                    {product.oldPrice > 0 && (
                      <span className="popular__products-old-price">
                        {product.oldPrice}€
                      </span>
                    )}
                  </div>

                  <div className="popular__products-actions">
                    {/* 🔹 Управление количеством */}
                    <div className="popular__products-quantity">
                      <button
                        className="popular__products-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQtyChange(product._id, -1);
                        }}
                      >
                        –
                      </button>
                      <span className="popular__products-count">
                        {quantities[product._id] || 1}
                      </span>
                      <button
                        className="popular__products-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQtyChange(product._id, +1);
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* 🔹 Добавление в корзину */}
                    <button
                      className="popular__products-cart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product._id);
                      }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Нет хитов продаж</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
