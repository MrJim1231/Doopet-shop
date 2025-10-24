import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import CatalogBlock from "../layout/CatalogBlock";
import heartIcon from "../assets/icons/heart1.svg";
// import placeholderImg from "../assets/images/no-image.png";

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔹 Загрузка продукта
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) addToCart(product._id, quantity);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (!product) return <p>Товар не найден</p>;

  const mainImage = product.imageUrl || placeholderImg;

  return (
    <div className="product__wrapper">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: product.category?.name || "Каталог" }]} />

      <section className="product__page">
        <div className="product__page-container">
          <div className="product__page-content">
            {/* ---------- Левая часть ---------- */}
            <div className="product__page-image-block">
              <img
                src={mainImage}
                alt={product.name}
                className="product__page-main-image"
                onError={(e) => (e.target.src = placeholderImg)}
              />

              {product.images && product.images.length > 0 && (
                <div className="product__page-thumbs">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:5000/${img}`}
                      alt={`миниатюра ${i + 1}`}
                      className="product__page-thumb"
                      onError={(e) => (e.target.src = placeholderImg)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ---------- Правая часть ---------- */}
            <div className="product__page-info">
              <h1 className="product__page-title">{product.name}</h1>

              <div className="product__page-price-block">
                <span className="product__page-price">
                  {product.price.toFixed(2)}€
                </span>
                {product.oldPrice > 0 && (
                  <span className="product__page-old-price">
                    {product.oldPrice.toFixed(2)}€
                  </span>
                )}
              </div>

              <div className="product__page-actions">
                <div className="product__page-quantity">
                  <button
                    className="product__page-qty-btn"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="product__page-qty-input"
                  />
                  <button
                    className="product__page-qty-btn"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>

                <button
                  className="product__page-add-btn"
                  onClick={handleAddToCart}
                >
                  Добавить в корзину
                </button>

                <img
                  src={heartIcon}
                  alt="Закладки"
                  className={`product__page-fav ${
                    isFavorite ? "product__page-fav--active" : ""
                  }`}
                  onClick={toggleFavorite}
                />
              </div>

              {/* ---------- Детали ---------- */}
              <ul className="product__page-details">
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Артикул:
                  </strong>
                  <span className="product__page-detail-value">
                    {product.article || "—"}
                  </span>
                </li>

                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Производитель:
                  </strong>
                  <span className="product__page-detail-value">
                    {product.manufacturer || "Не указан"}
                  </span>
                </li>

                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Наличие:
                  </strong>
                  <span className="product__page-detail-value">
                    {product.stock > 0 ? "Есть в наличии" : "Нет в наличии"}
                  </span>
                </li>

                {/* 🔹 Вместо "Размер упаковки" теперь "Цена" */}
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">Цена:</strong>
                  <span className="product__page-detail-value">
                    {product.price.toFixed(2)}€
                  </span>
                </li>
              </ul>

              <div className="product__page-actions">
                <button className="product__page-question-btn">
                  Задать вопрос
                </button>
                <a href="#" className="product__page-delivery-info">
                  Информация о доставке
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
