import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuIcon from "../assets/icons/Menu.svg";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import CatalogDropdown from "../layout/CatalogDropdown";
import CartDropdown from "../layout/CartDropdown";

function CatalogBlock() {
  const { totalCount, totalPrice } = useCart();
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);
  const hideTimeout = useRef(null);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsCartVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsCartVisible(false);
    }, 200); // задержка 200 мс
  };

  return (
    <div className="catalog-block">
      <div className="catalog-block__container">
        {/* 🔹 Каталог */}
        <div
          className="catalog-block__menu"
          onMouseEnter={() => setIsCatalogVisible(true)}
          onMouseLeave={() => setIsCatalogVisible(false)}
        >
          <button className="catalog-block__menu-btn" aria-label="Открыть меню">
            <img
              src={menuIcon}
              alt="Меню"
              className="catalog-block__menu-icon"
            />
          </button>
          <span className="catalog-block__menu-text">Каталог</span>
          {isCatalogVisible && <CatalogDropdown />}
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
        <div
          className="catalog-block__cart-wrapper"
          ref={cartRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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

          {isCartVisible && (
            <div className="catalog-block__cart-dropdown">
              <CartDropdown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogBlock;
