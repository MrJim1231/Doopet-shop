import locationIcon from "../assets/icons/location.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import heartIcon from "../assets/icons/heart.svg";
import accountIcon from "../assets/icons/account.svg";
import sortIcon from "../assets/icons/sort.svg";

function HeaderTopBar() {
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

          <li className="header__topbar-item header__topbar-item--account">
            <img src={accountIcon} alt="Аккаунт" className="header__icon" />
            <a className="header__link header__link--sm" href="/account">
              Личный кабинет
            </a>
            <button className="header__topbar-item-btn">
              <img src={sortIcon} alt="Открыть меню" className="header__icon" />
            </button>
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
