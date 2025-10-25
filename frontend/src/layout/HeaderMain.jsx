import { Link } from "react-router-dom";
import logoIcon from "../assets/icons/logo.svg";
import logoText from "../assets/icons/DooPet.svg";
import menuIcon from "../assets/icons/Menu.svg";

function Header() {
  return (
    <div className="header__container">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src={logoIcon} alt="Логотип" className="header__logo-icon" />
          <img src={logoText} alt="DooPet" className="header__logo-text" />
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/promotions" className="header__nav-link">
                Акции
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/about" className="header__nav-link">
                О нас
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/blog" className="header__nav-link">
                Блог
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/delivery" className="header__nav-link">
                Доставка и оплата
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contacts" className="header__nav-link">
                Контакты
              </Link>
            </li>
          </ul>

          <button className="header__menu-btn" aria-label="Открыть меню">
            <img src={menuIcon} alt="Меню" className="header__menu-icon" />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Header;
