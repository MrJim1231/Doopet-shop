import { useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/icons/logo.svg";
import logoText from "../assets/icons/DooPet.svg";
import menuIcon from "../assets/icons/Menu.svg";

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header__container">
      <div className="header__inner">
        {/* 🔹 Логотип */}
        <Link to="/" className="header__logo">
          <img src={logoIcon} alt="Логотип" className="header__logo-icon" />
          <img src={logoText} alt="DooPet" className="header__logo-text" />
        </Link>

        {/* 🔹 Навигация */}
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <ul className="header__nav-list">
            <li>
              <Link
                to="/promotions"
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Акции
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                О нас
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                to="/delivery"
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Доставка и оплата
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Контакты
              </Link>
            </li>
          </ul>

          {/* Кнопка закрытия X (появляется только на мобилке) */}
          <button
            className="header__close-btn"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </nav>

        {/* 🔹 Бургер */}
        <button
          className="header__menu-btn"
          aria-label="Открыть меню"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={menuIcon} alt="Меню" className="header__menu-icon" />
        </button>

        {/* 🔹 Затемнение фона при открытом меню */}
        {menuOpen && (
          <div
            className="header__overlay"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}

export default HeaderMain;
