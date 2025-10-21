import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import CatalogBlock from "../layout/CatalogBlock";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
// import graphicIcon from "../assets/icons/graphic-elements.svg";
import product1 from "../assets/images/products/product.png";
import product2 from "../assets/images/products/product2.png";
import product3 from "../assets/images/products/product3.png";
import product4 from "../assets/images/products/product4.png";
import product5 from "../assets/images/products/product5.png";
import product6 from "../assets/images/products/product6.png";
import product7 from "../assets/images/products/product7.png";
import product8 from "../assets/images/products/product8.png";

// import "../styles/Catalog.scss";

function Catalog() {
  const [minPrice, setMinPrice] = useState(15);
  const [maxPrice, setMaxPrice] = useState(60);
  const [packageSize, setPackageSize] = useState("2kg");

  const products = [
    {
      id: 1,
      title: "Корм для собак Organic egg layer pellets",
      price: "2.55€",
      oldPrice: "2.55€",
      image: product1,
      tag: "Хит",
      label: "Новинка",
    },
    {
      id: 2,
      title: "Корм для кошек KMR Pwdr 12oz",
      price: "2.45€",
      oldPrice: "3.45€",
      image: product2,
      tag: "Хит",
      label: "Новинка",
    },
    {
      id: 3,
      title: "Корм для собак tripett Single animal protein",
      price: "3€",
      oldPrice: "3.22€",
      image: product3,
      tag: "Хит",
    },
    {
      id: 4,
      title: "Корм для собак Green Papaya Fruit",
      price: "3.12€",
      image: product4,
      tag: "Хит",
    },
    {
      id: 5,
      title: "Корм для собак James Wellbeloved",
      price: "2.55€",
      image: product5,
    },
    {
      id: 6,
      title: "Корм для собак purina beyond",
      price: "2.55€",
      image: product6,
    },
    {
      id: 7,
      title: "Корм для кошек Norwegian Tuna Fish",
      price: "2.55€",
      image: product7,
      label: "Новинка",
    },
    {
      id: 8,
      title: "Корм для кошек Catfish Natural ingredients",
      price: "2.55€",
      oldPrice: "2.55€",
      image: product8,
      tag: "Хит",
    },
  ];

  return (
    <div className="catalog-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />

      <Breadcrumbs items={[{ label: "Корм для собак" }]} />

      <section className="catalog">
        <div className="catalog__container">
          {/* ---------- ЛЕВАЯ КОЛОНКА ---------- */}
          <aside className="catalog__filters">
            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Цена</h3>
              <div className="catalog__price-range">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div className="catalog__price-values">
                  <span>{minPrice} €</span> — <span>{maxPrice} €</span>
                </div>
              </div>
            </div>

            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Производители</h3>
              <ul className="catalog__checkbox-list">
                {["VanCat", "Beef", "TunaFish"].map((brand) => (
                  <li key={brand}>
                    <label>
                      <input type="checkbox" /> {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Размер упаковки</h3>
              <ul className="catalog__checkbox-list">
                {["2 kg", "3 kg", "5 kg", "10 kg"].map((size) => (
                  <li key={size}>
                    <label>
                      <input
                        type="checkbox"
                        checked={packageSize === size}
                        onChange={() => setPackageSize(size)}
                      />{" "}
                      {size}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ---------- ПРАВАЯ КОЛОНКА ---------- */}
          <div className="catalog__content">
            <div className="catalog__controls">
              <div className="catalog__view-buttons">
                <button className="catalog__view-btn active">▦</button>
                <button className="catalog__view-btn">☰</button>
              </div>
              <div className="catalog__sort">
                <label>Сортировка:</label>
                <select>
                  <option>По умолчанию</option>
                  <option>По возрастанию цены</option>
                  <option>По убыванию цены</option>
                </select>
              </div>
              <div className="catalog__show-count">
                <label>Показать:</label>
                <select>
                  <option>12</option>
                  <option>24</option>
                  <option>48</option>
                </select>
              </div>
            </div>

            <div className="catalog__grid">
              {Array.from({ length: 9 }).map((_, index) => {
                const product = products[index % 3]; // только первые 3
                return (
                  <Link
                    key={index}
                    to="/product"
                    className="catalog__card"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="catalog__card-image-wrapper">
                      <div className="catalog__card-labels">
                        {product.tag && (
                          <span className="catalog__label catalog__label--hit">
                            {product.tag}
                          </span>
                        )}
                        {product.label && (
                          <span className="catalog__label catalog__label--new">
                            {product.label}
                          </span>
                        )}
                      </div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="catalog__card-image"
                      />
                    </div>

                    <h3 className="catalog__card-title">{product.title}</h3>

                    <div className="catalog__card-prices">
                      <span className="catalog__price">{product.price}</span>
                      {product.oldPrice && (
                        <span className="catalog__old-price">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>

                    <div className="catalog__card-actions">
                      <div className="catalog__quantity">
                        <button>-</button>
                        <span>2</span>
                        <button>+</button>
                      </div>
                      <button className="catalog__cart-btn">В корзину</button>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ---------- ПАГИНАЦИЯ ---------- */}
            <div className="catalog__pagination">
              <div className="catalog__pagination-pages">
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>&lt;</button>
                <button>&gt;</button>
              </div>
              <div className="catalog__pagination-info">
                Показано с 1 по 5 из 11 (всего 3 страниц)
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Catalog;
