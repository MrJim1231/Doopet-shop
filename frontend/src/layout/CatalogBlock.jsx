import { Link } from "react-router-dom";
import menuIcon from "../assets/icons/Menu.svg";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";

function CatalogBlock() {
  return (
    <div className="catalog-block">
      <div className="catalog-block__container">
        {/* Кнопка открытия меню каталога */}
        <div className="catalog-block__menu">
          <Link
            to="/catalog"
            className="catalog-block__menu-btn"
            aria-label="Открыть меню"
          >
            <img
              src={menuIcon}
              alt="Меню"
              className="catalog-block__menu-icon"
            />
          </Link>
          <span className="catalog-block__menu-text">Каталог</span>
        </div>

        {/* Поле поиска */}
        <div className="catalog-block__search">
          <input
            type="text"
            className="catalog-block__search-input"
            placeholder="Поиск по сайту..."
          />
          <button className="catalog-block__search-btn">
            <img
              src={searchIcon}
              alt="Поиск"
              className="catalog-block__search-icon"
            />
          </button>
        </div>

        {/* Блок корзины */}
        <div className="catalog-block__cart">
          <Link
            to="/cart"
            className="catalog-block__cart-btn"
            aria-label="Перейти в корзину"
          >
            <img
              src={cartIcon}
              alt="Корзина"
              className="catalog-block__cart-icon"
            />
          </Link>
          <span className="catalog-block__cart-text">Товаров 2 (600 грн)</span>
        </div>
      </div>
    </div>
  );
}

export default CatalogBlock;
