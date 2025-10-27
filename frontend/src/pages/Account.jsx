import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ добавлено
import Auth from "./auth/Auth";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

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
  const navigate = useNavigate(); // ✅ хук навигации

  if (!user) {
    return <Auth />;
  }

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Личный кабинет" }]} />

      <section className="account">
        <div className="account__container">
          <SectionHeader
            icon={graphicIcon}
            title="Личный кабинет"
            baseClass="account__header"
          />

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

                  {/* ❤️ Переход на закладки */}
                  <div
                    className="account__card account__card--link"
                    onClick={() => navigate("/favorites")}
                  >
                    <Heart className="account__icon" />
                    <p>Посмотреть закладки</p>
                  </div>
                </div>
              </div>

              {/* Мои заказы */}
              <div className="account__section">
                <h3 className="account__subtitle">Мои заказы</h3>
                <div className="account__grid">
                  {/* 🕒 История заказов */}
                  <div
                    className="account__card account__card--link"
                    onClick={() => navigate("/orders")}
                  >
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
                {/* ❤️ пункт "Закладки" */}
                <li onClick={() => navigate("/favorites")}>Закладки</li>
                {/* 🕒 пункт "История заказов" */}
                <li onClick={() => navigate("/orders")}>История заказов</li>
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
