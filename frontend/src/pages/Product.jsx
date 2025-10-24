import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../context/AuthContext"; // 🟢 используем контекст авторизации

import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
import CatalogBlock from "../layout/CatalogBlock";
import heartIcon from "../assets/icons/heart1.svg";
import heartFilled from "../assets/icons/heart1.svg";
import placeholderImg from "../assets/images/no-image.png";

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { product, loading, error } = useProduct(id);
  const { user } = useAuth(); // 🟢 получаем текущего пользователя

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // 🟢 Проверка, в избранном ли товар
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user?._id || !product?._id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/favorites/check/${user._id}/${product._id}`
        );
        setIsFavorite(res.data.isFavorite);
      } catch (err) {
        console.error("Ошибка при проверке избранного:", err);
      }
    };
    checkFavorite();
  }, [product, user]);

  // 🟢 Добавить / удалить из избранного
  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Чтобы добавить товар в закладки, пожалуйста, авторизуйтесь 😊");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/favorites", {
        userId: user._id,
        productId: product._id,
      });
      setIsFavorite(res.data.isFavorite);
    } catch (err) {
      console.error("Ошибка при изменении избранного:", err);
    }
  };

  const handleAddToCart = () => {
    if (product) addToCart(product._id, quantity);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Товар не найден</p>;

  const mainImage = product.imageUrl || placeholderImg;

  const breadcrumbs = [
    {
      label: product.categoryId?.name || "Категория",
      path: `/category/${product.categoryId?._id}`,
    },
    { label: product.name },
  ];

  return (
    <div className="product__wrapper">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={breadcrumbs} />

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

                {/* ❤️ Кнопка избранного */}
                <img
                  src={isFavorite ? heartFilled : heartIcon}
                  alt="Закладки"
                  className={`product__page-fav ${
                    isFavorite ? "product__page-fav--active" : ""
                  }`}
                  onClick={handleToggleFavorite}
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

          {/* ---------- Вкладки: Описание / Отзывы ---------- */}
          <div className="product__page-tabs">
            <div className="product__page-tabs-header">
              <button
                className={`product__tab-btn ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Описание
              </button>
              <button
                className={`product__tab-btn ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Отзывы (2)
              </button>
            </div>

            <div className="product__page-tabs-content">
              {activeTab === "description" ? (
                <div className="product__tab-description">
                  <p className="product__description-text">
                    {product.description || "Описание отсутствует."}
                  </p>
                </div>
              ) : (
                <div className="product__tab-reviews">
                  <p>
                    Пока нет отзывов. Будьте первым, кто оставит отзыв о товаре!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Product;
