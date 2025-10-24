import { useAuth } from "../context/AuthContext";
import Auth from "./auth/Auth";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import {
  User,
  Key,
  MapPin,
  Heart,
  Clock,
  FileText,
  Gift,
  CreditCard,
  Repeat,
  Mail,
  LogOut,
} from "lucide-react";

function Account() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs />

      <section className="account">
        <div className="account__container">
          <h2 className="account__title">
            <span className="account__title-icon">🐾</span> Личный кабинет
          </h2>

          <div className="account__content">
            {/* Левая часть */}
            <div className="account__main">
              {/* Моя учетная запись */}
              <div className="account__section">
                <h3 className="account__subtitle">Моя учетная запись</h3>
                <div className="account__grid">
                  <div className="account__card">
                    <User className="account__icon" />
                    <p>Изменить контактную информацию</p>
                  </div>
                  <div className="account__card">
                    <Key className="account__icon" />
                    <p>Изменить свой пароль</p>
                  </div>
                  <div className="account__card">
                    <MapPin className="account__icon" />
                    <p>Изменить мои адреса</p>
                  </div>
                  <div className="account__card">
                    <Heart className="account__icon" />
                    <p>Посмотреть закладки</p>
                  </div>
                </div>
              </div>

              {/* Мои заказы */}
              <div className="account__section">
                <h3 className="account__subtitle">Мои заказы</h3>
                <div className="account__grid">
                  <div className="account__card">
                    <Clock className="account__icon" />
                    <p>История заказов</p>
                  </div>
                  <div className="account__card">
                    <FileText className="account__icon" />
                    <p>Файлы для скачивания</p>
                  </div>
                  <div className="account__card">
                    <Gift className="account__icon" />
                    <p>Бонусные баллы</p>
                  </div>
                  <div className="account__card">
                    <CreditCard className="account__icon" />
                    <p>История транзакций</p>
                  </div>
                  <div className="account__card">
                    <Repeat className="account__icon" />
                    <p>Периодические платежи</p>
                  </div>
                </div>
              </div>

              {/* Подписка */}
              <div className="account__section">
                <h3 className="account__subtitle">Подписка</h3>
                <div className="account__grid">
                  <div className="account__card">
                    <Mail className="account__icon" />
                    <p>Подписаться или отказаться от рассылки</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <aside className="account__sidebar">
              <ul className="account__menu">
                <li>Моя информация</li>
                <li>Изменить контактную информацию</li>
                <li>Пароль</li>
                <li>Адресная книга</li>
                <li>Закладки</li>
                <li>История заказов</li>
                <li>Файлы для скачивания</li>
                <li>История транзакций</li>
                <li>E-Mail рассылка</li>
                <li onClick={logout} className="account__logout">
                  <LogOut className="account__logout-icon" /> Выйти
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
