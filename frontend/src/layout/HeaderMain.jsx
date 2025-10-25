import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoIcon from "../assets/icons/logo.svg";
import logoText from "../assets/icons/DooPet.svg";
import menuIcon from "../assets/icons/Menu.svg";

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header__container">
      <div className="header__inner">
        {/* 🔹 Логотип */}
        <NavLink to="/" className="header__logo">
          <img src={logoIcon} alt="Логотип" className="header__logo-icon" />
          <img src={logoText} alt="DooPet" className="header__logo-text" />
        </NavLink>

        {/* 🔹 Навигация */}
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <ul className="header__nav-list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                О нас
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Блог
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/delivery"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Доставка и оплата
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Контакты
              </NavLink>
            </li>
          </ul>

          {/* Кнопка закрытия X */}
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

        {/* 🔹 Затемнение фона */}
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
