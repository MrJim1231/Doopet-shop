import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // 🔹 Копирование email с уведомлением
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@doopet.com");
    alert("📧 Email скопирован в буфер обмена!");
  };

  return (
    <div className="header__topbar-container">
      <div className="header__topbar">
        <ul className="header__topbar-list">
          {/* ---------- Адрес ---------- */}
          <li className="header__topbar-item">
            <img src={locationIcon} alt="Адрес" className="header__icon" />
            <a
              className="header__link"
              href="https://www.google.com/maps?q=Madonas+novads,+LV-4877,+Latvia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Madonas novads, LV-4877, Латвия
            </a>
          </li>

          {/* ---------- Email ---------- */}
          <li className="header__topbar-item">
            <img src={emailIcon} alt="Емейл" className="header__icon" />
            <button
              className="header__link header__link--btn"
              onClick={handleCopyEmail}
            >
              info@doopet.com
            </button>
          </li>

          {/* ---------- Телефон ---------- */}
          <li className="header__topbar-item">
            <img src={phoneIcon} alt="Телефон" className="header__icon" />
            <a
              className="header__link header__link--sm"
              href="tel:+37128840340"
            >
              +371 28840340
            </a>
          </li>

          {/* ---------- Аккаунт ---------- */}
          <li
            className="header__topbar-item header__topbar-item--account"
            ref={menuRef}
          >
            <img src={accountIcon} alt="Аккаунт" className="header__icon" />
            <Link
              className="header__link header__link--sm"
              to={user ? "/account" : "/auth/login"}
            >
              {user ? user.name || "Профиль" : "Личный кабинет"}
            </Link>

            <button
              className="header__topbar-item-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Открыть меню аккаунта"
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
                    <Link to="/account" className="header__account-item">
                      Мой профиль
                    </Link>
                    <button
                      onClick={logout}
                      className="header__account-item header__account-item--logout"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="header__account-item">
                      Войти
                    </Link>
                    <Link to="/auth/register" className="header__account-item">
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            )}
          </li>

          {/* ---------- Закладки ---------- */}
          <li className="header__topbar-item">
            <img src={heartIcon} alt="Закладки" className="header__icon" />
            <Link
              to="/account/favorites"
              className="header__link header__link--sm"
            >
              Закладки
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderTopBar;
