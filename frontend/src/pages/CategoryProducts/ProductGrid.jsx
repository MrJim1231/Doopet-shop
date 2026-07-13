import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../utils/image";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductGrid({ products, loading }) {
  const [quantities, setQuantities] = useState({});
  const [adding, setAdding] = useState({});
  const { addToCart } = useCart(); // ✅ берём addToCart из контекста

  // Изменение количества
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Добавление товара в корзину
  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1;

    try {
      setAdding((prev) => ({ ...prev, [productId]: true }));

      // ✅ используем addToCart из контекста — он сам показывает уведомление
      await addToCart(productId, quantity);
    } catch (error) {
      console.error("❌ Ошибка при добавлении в корзину:", error);
    } finally {
      setAdding((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Заглушки
  if (loading) return <p>Загрузка...</p>;
  if (products.length === 0) return <p>Товары отсутствуют</p>;

  return (
    <div className="category__grid">
      {products.map((product) => (
        <div
          key={product._id}
          className="category__card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Link to={`/product/${product._id}`}>
            <div className="category__card-image-wrapper">
              {(product.tag?.trim() || product.label?.trim()) && (
                <div className="category__card-labels">
                  {product.tag?.trim() && (
                    <span className="category__label category__label--hit">
                      {product.tag}
                    </span>
                  )}
                  {product.label?.trim() && (
                    <span className="category__label category__label--new">
                      {product.label}
                    </span>
                  )}
                </div>
              )}
              <img
                src={getImageUrl(product.image || product.imageUrl)}
                alt={product.name}
                className="category__card-image"
              />
            </div>
          </Link>

          <h3 className="category__card-title">{product.name}</h3>

          <div className="category__card-prices">
            <span className="category__price">{product.price} €</span>
            {product.oldPrice > 0 && (
              <span className="category__old-price">{product.oldPrice} €</span>
            )}
          </div>

          <div className="category__card-actions">
            <div className="category__quantity">
              <button onClick={() => handleQuantityChange(product._id, -1)}>
                -
              </button>
              <span>{quantities[product._id] || 1}</span>
              <button onClick={() => handleQuantityChange(product._id, 1)}>
                +
              </button>
            </div>

            <button
              className="category__cart-btn"
              onClick={() => handleAddToCart(product._id)}
              disabled={adding[product._id]}
            >
              {adding[product._id] ? "Добавляется..." : "В корзину"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
