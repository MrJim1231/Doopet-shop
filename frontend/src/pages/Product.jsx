import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import CatalogBlock from "../layout/CatalogBlock";
import productImage from "../assets/images/product.png";
import heartIcon from "../assets/icons/heart1.svg";
import { useState } from "react";

function Product() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="product__wrapper">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Корм для собак" }]} />

      <section className="product__page">
        <div className="product__page-container">
          <div className="product__page-content">
            {/* Левая часть — изображение */}
            <div className="product__page-image-block">
              <img
                src={productImage}
                alt="Корм для собак Good Dog Reward"
                className="product__page-main-image"
              />
              <div className="product__page-thumbs">
                <img
                  src={productImage}
                  alt="миниатюра 1"
                  className="product__page-thumb"
                />
                <img
                  src={productImage}
                  alt="миниатюра 2"
                  className="product__page-thumb"
                />
                <img
                  src={productImage}
                  alt="миниатюра 3"
                  className="product__page-thumb"
                />
                <img
                  src={productImage}
                  alt="миниатюра 4"
                  className="product__page-thumb"
                />
              </div>
            </div>

            {/* Правая часть — информация */}
            <div className="product__page-info">
              <h1 className="product__page-title">
                Корм для собак Good Dog Reward
              </h1>

              <div className="product__page-price-block">
                <span className="product__page-price">3.12€</span>
                <span className="product__page-old-price">4.10€</span>
              </div>

              <div className="product__page-actions">
                <div className="product__page-quantity">
                  <button className="product__page-qty-btn">-</button>
                  <input
                    type="number"
                    value="2"
                    readOnly
                    className="product__page-qty-input"
                  />
                  <button className="product__page-qty-btn">+</button>
                </div>

                <button className="product__page-add-btn">
                  Добавить в корзину
                </button>

                <img
                  src={heartIcon}
                  alt="Закладки"
                  className="product__page-fav"
                />
              </div>

              <ul className="product__page-details">
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Артикул:
                  </strong>
                  <span className="product__page-detail-value">LEDF01</span>
                </li>
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Производитель:
                  </strong>
                  <span className="product__page-detail-value">BEEF</span>
                </li>
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">
                    Наличие:
                  </strong>
                  <span className="product__page-detail-value">
                    Есть в наличии
                  </span>
                </li>
                <li className="product__page-detail">
                  <strong className="product__page-detail-label">Цена:</strong>
                  <span className="product__page-detail-value">2.55€</span>
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
