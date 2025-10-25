import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/recommended"
        );
        setProducts(res.data || []);
      } catch (error) {
        console.error("Ошибка при загрузке рекомендуемых:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
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
    <section className="recommended">
      <div className="recommended__container">
        <div className="recommended__header">
          <img src={graphicIcon} alt="icon" className="recommended__icon" />
          <h2 className="recommended__title">Рекомендуемые товары</h2>
        </div>

        <div className="recommended__products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="recommended__card">
                <Link
                  to={`/product/${product._id}`}
                  className="recommended__image-wrapper"
                >
                  <div className="recommended__labels">
                    {product.tag && (
                      <span className="recommended__label recommended__label--hit">
                        {product.tag}
                      </span>
                    )}
                    {product.label && (
                      <span className="recommended__label recommended__label--new">
                        {product.label}
                      </span>
                    )}
                  </div>
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.name}
                    className="recommended__image"
                  />
                </Link>

                <div className="recommended__info">
                  <h3 className="recommended__name">{product.name}</h3>

                  <div className="recommended__prices">
                    <span className="recommended__price">{product.price}€</span>
                    {product.oldPrice > 0 && (
                      <span className="recommended__old-price">
                        {product.oldPrice}€
                      </span>
                    )}
                  </div>

                  <div className="recommended__actions">
                    <div className="recommended__quantity">
                      <button
                        className="recommended__btn"
                        onClick={() => handleQtyChange(product._id, -1)}
                      >
                        –
                      </button>
                      <span className="recommended__count">
                        {quantities[product._id] || 1}
                      </span>
                      <button
                        className="recommended__btn"
                        onClick={() => handleQtyChange(product._id, +1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="recommended__cart-btn"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Нет рекомендуемых товаров</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecommendedProducts;
