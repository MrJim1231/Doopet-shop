import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import locationIcon from "../assets/icons/location.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import heartIcon from "../assets/icons/heart.svg";
import accountIcon from "../assets/icons/account.svg";
import sortIcon from "../assets/icons/sort.svg";

function HeaderTopBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 🔹 Закрытие меню при клике вне блока
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="header__topbar-container">
      <div className="header__topbar">
        <ul className="header__topbar-list">
          <li className="header__topbar-item">
            <img src={locationIcon} alt="Адрес" className="header__icon" />
            <a className="header__link">Madonas novads, LV-4877, Латвия</a>
          </li>

          <li className="header__topbar-item">
            <img src={emailIcon} alt="Емейл" className="header__icon" />
            <a className="header__link" href="mailto:info@doopet.com">
              info@doopet.com
            </a>
          </li>

          <li className="header__topbar-item">
            <img src={phoneIcon} alt="Телефон" className="header__icon" />
            <a
              className="header__link header__link--sm"
              href="tel:+37128840340"
            >
              +371 28840340
            </a>
          </li>

          {/* 🔹 Личный кабинет с выпадающим меню */}
          <li
            className="header__topbar-item header__topbar-item--account"
            ref={menuRef}
          >
            <img src={accountIcon} alt="Аккаунт" className="header__icon" />
            <a className="header__link header__link--sm" href="/account">
              {user ? user.name || "Профиль" : "Личный кабинет"}
            </a>
            <button
              className="header__topbar-item-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src={sortIcon}
                alt="Открыть меню"
                className={`header__icon ${menuOpen ? "rotated" : ""}`}
              />
            </button>

            {menuOpen && (
              <div className="header__account-menu">
                {user ? (
                  <>
                    <a href="/account" className="header__account-item">
                      Мой профиль
                    </a>
                    <button
                      onClick={logout}
                      className="header__account-item header__account-item--logout"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/account" className="header__account-item">
                      Войти
                    </a>
                    <a href="/account" className="header__account-item">
                      Регистрация
                    </a>
                  </>
                )}
              </div>
            )}
          </li>

          <li className="header__topbar-item">
            <img src={heartIcon} alt="Закладки" className="header__icon" />
            <a className="header__link header__link--sm" href="/bookmarks">
              Закладки
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderTopBar;
