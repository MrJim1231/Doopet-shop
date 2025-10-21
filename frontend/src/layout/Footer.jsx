import logoIcon from "../assets/icons/logo.svg";
import logoText from "../assets/icons/DooPet.svg";
import locationIcon from "../assets/icons/location.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import telegramIcon from "../assets/icons/telegram.svg";
import instagramIcon from "../assets/icons/instagram.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Левая колонка */}
        <div className="footer__col footer__col--about">
          <div className="footer__logo">
            <img
              src={logoIcon}
              alt="Логотип DooPet"
              className="footer__logo-icon"
            />
            <img src={logoText} alt="DooPet" className="footer__logo-text" />
          </div>
          <p className="footer__description">
            Мы — лидеры в области предоставления высококачественных кормов для
            ваших домашних любимцев. Наша миссия — обеспечить заботу и
            благополучие ваших животных через лучшие продукты на рынке.
          </p>
        </div>

        {/* Средняя колонка */}
        <div className="footer__col footer__col--links">
          <h4 className="footer__title">Товары DOOPET</h4>
          <ul className="footer__list">
            <li className="footer__item">Корм для котов</li>
            <li className="footer__item">Корм для собак</li>
            <li className="footer__item">Консервы для собак</li>
            <li className="footer__item">Консервы для котов</li>
            <li className="footer__item">Лакомства для собак</li>
            <li className="footer__item">Наполнители туалетов</li>
            <li className="footer__item">Контейнеры для перевозки</li>
          </ul>
        </div>

        {/* Информация */}
        <div className="footer__col footer__col--info">
          <h4 className="footer__title">Информация</h4>
          <ul className="footer__list">
            <li className="footer__item">О нас</li>
            <li className="footer__item">Доставка</li>
            <li className="footer__item">Оплата</li>
            <li className="footer__item">
              Политика конфиденциальности и условия пользования
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div className="footer__col footer__col--contacts">
          <h4 className="footer__title">Контакты</h4>

          <div className="footer__contact">
            <img
              src={locationIcon}
              alt="Адрес"
              className="footer__contact-icon"
            />
            <span className="footer__contact-text">
              Madonas novads, LV-4877, Латвия
            </span>
          </div>

          <div className="footer__contact">
            <img src={emailIcon} alt="Email" className="footer__contact-icon" />
            <a href="mailto:info@doopet.com" className="footer__contact-link">
              info@doopet.com
            </a>
          </div>

          <div className="footer__contact">
            <img
              src={phoneIcon}
              alt="Телефон"
              className="footer__contact-icon"
            />
            <a href="tel:+37128840340" className="footer__contact-link">
              +371 28840340
            </a>
          </div>

          <div className="footer__socials">
            <a href="#" className="footer__social-link">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="footer__social-icon"
              />
            </a>
            <a href="#" className="footer__social-link">
              <img
                src={telegramIcon}
                alt="Telegram"
                className="footer__social-icon"
              />
            </a>
            <a href="#" className="footer__social-link">
              <img
                src={instagramIcon}
                alt="Instagram"
                className="footer__social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
