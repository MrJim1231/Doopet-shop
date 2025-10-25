import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuIcon from "../assets/icons/Menu.svg";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import CatalogDropdown from "../layout/CatalogDropdown"; // 🟢 заменяем Sidebar на Dropdown

function CatalogBlock() {
  const { totalCount, totalPrice } = useCart();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="catalog-block">
      <div className="catalog-block__container">
        {/* 🔹 Каталог с выпадающим меню */}
        <div
          className="catalog-block__menu"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <button className="catalog-block__menu-btn" aria-label="Открыть меню">
            <img
              src={menuIcon}
              alt="Меню"
              className="catalog-block__menu-icon"
            />
          </button>
          <span className="catalog-block__menu-text">Каталог</span>

          {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
          {isDropdownVisible && <CatalogDropdown />}
        </div>

        {/* 🔹 Поиск */}
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

        {/* 🔹 Корзина */}
        <Link
          to="/cart"
          className="catalog-block__cart"
          aria-label="Перейти в корзину"
        >
          <img
            src={cartIcon}
            alt="Корзина"
            className="catalog-block__cart-icon"
          />
          <span className="catalog-block__cart-text">
            Товаров {totalCount} ({totalPrice.toFixed(2)} €)
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CatalogBlock;
