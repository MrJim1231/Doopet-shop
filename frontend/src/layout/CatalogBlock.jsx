import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuIcon from "../assets/icons/Menu.svg";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import CatalogSidebar from "../layout/CatalogSidebar"; // ✅ импорт нового компонента

function CatalogBlock() {
  const { totalCount, totalPrice } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="catalog-block">
        <div className="catalog-block__container">
          {/* Кнопка открытия меню каталога */}
          <div
            className="catalog-block__menu"
            onClick={() => setSidebarOpen(true)}
          >
            <button
              className="catalog-block__menu-btn"
              aria-label="Открыть меню"
            >
              <img
                src={menuIcon}
                alt="Меню"
                className="catalog-block__menu-icon"
              />
            </button>
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

          {/* Корзина */}
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
            <span className="catalog-block__cart-text">
              Товаров {totalCount} ({totalPrice.toFixed(2)} €)
            </span>
          </div>
        </div>
      </div>

      {/* Сайдбар */}
      <CatalogSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}

export default CatalogBlock;
