import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import CatalogBlock from "../layout/CatalogBlock";
import productImage from "../assets/images/product.png";
import { useState } from "react";

function Product() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />

      <Breadcrumbs items={[{ label: "Корм для собак" }]} />

      <section className="product__page">
        <div className="product__page-container">
          <div className="product__page-content">
            {/* Левая часть — изображение */}
            <div className="product__page-image">
              <img src={productImage} alt="Корм для собак Good Dog Reward" />
              <div className="product__page-thumbs">
                <img src={productImage} alt="миниатюра 1" />
                <img src={productImage} alt="миниатюра 2" />
                <img src={productImage} alt="миниатюра 3" />
                <img src={productImage} alt="миниатюра 4" />
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

              <div className="product__page-quantity">
                <button>-</button>
                <input type="number" value="2" readOnly />
                <button>+</button>
              </div>

              <button className="product__page-add-btn">
                Добавить в корзину
              </button>

              <ul className="product__page-details">
                <li>
                  <strong>Артикул:</strong> LEDF01
                </li>
                <li>
                  <strong>Производитель:</strong> BEEF
                </li>
                <li>
                  <strong>Наличие:</strong> Есть в наличии
                </li>
                <li>
                  <strong>Цена:</strong> 2.55€
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

          {/* Блок вкладок */}
          <div className="product__tabs">
            <div className="product__tabs-header">
              <button
                className={`product__tabs-btn ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Описание
              </button>
              <button
                className={`product__tabs-btn ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Отзывы (2)
              </button>
            </div>

            <div className="product__tabs-content">
              {activeTab === "description" && (
                <div className="product__tab-description">
                  <p>
                    Наш корм для собак — это забота о вашем верном спутнике,
                    выраженная в каждой грануле. Мы создаем уникальные рецепты,
                    богатые натуральными ингредиентами, которые специально
                    разработаны для удовлетворения потребностей вашей собаки в
                    питательных веществах и вкусе.
                  </p>
                  <p>
                    Наши продукты вдохновлены природой и разработаны с учетом
                    здоровья и благополучия вашего пушистого друга. Каждая
                    упаковка — это обещание качества и заботы.
                  </p>
                  <ul>
                    <li>
                      <strong>Натуральные ингредиенты:</strong> Наш корм не
                      содержит искусственных красителей и консервантов.
                    </li>
                    <li>
                      <strong>Баланс питательных веществ:</strong> Разработан с
                      учетом баланса белков, жиров, углеводов, витаминов и
                      минералов.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="product__tab-reviews">
                  <p>Здесь будут отзывы покупателей (2).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
