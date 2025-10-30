import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../layout/Header";
import Breadcrumbs from "../../layout/Breadcrumbs";
import Footer from "../../layout/Footer";
import SectionHeader from "../../components/SectionHeader";
import graphicIcon from "../../assets/icons/graphic-elements.svg";
import { LogOut, Heart, User, Clock, Key } from "lucide-react";
import { useEffect } from "react";

export default function AccountLayout() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Редирект на логин, если пользователь не авторизован
  useEffect(() => {
    if (!loading && !user && location.pathname.startsWith("/account")) {
      navigate("/auth/login");
    }
  }, [loading, user, location.pathname, navigate]);

  // ⏳ Состояние загрузки
  if (loading) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", margin: "80px 0" }}>
          ⏳ Загрузка профиля...
        </p>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  // 🧭 Заголовок страницы в зависимости от маршрута
  const getTitle = () => {
    if (location.pathname.includes("/account/favorites")) return "Закладки";
    if (location.pathname.includes("/account/orders")) return "История заказов";
    if (location.pathname.includes("/account/profile"))
      return "Изменить контактную информацию";
    if (location.pathname.includes("/account/change-password"))
      return "Изменить пароль";
    return "Личный кабинет";
  };

  // 🍞 Хлебные крошки
  const getBreadcrumbs = () => {
    const crumbs = [{ label: "Личный кабинет", path: "/account" }];

    if (location.pathname.includes("/account/favorites"))
      crumbs.push({ label: "Закладки" });

    if (location.pathname.includes("/account/orders"))
      crumbs.push({ label: "История заказов" });

    if (location.pathname.includes("/account/profile"))
      crumbs.push({ label: "Изменить контактную информацию" });

    if (location.pathname.includes("/account/change-password"))
      crumbs.push({ label: "Изменить пароль" });

    return crumbs;
  };

  return (
    <>
      <Header />
      <Breadcrumbs items={getBreadcrumbs()} />

      <section className="account">
        <div className="account__container">
          <SectionHeader
            icon={graphicIcon}
            title={getTitle()}
            baseClass="account__header"
          />

          <div className="account__content">
            {/* 📋 Сайдбар */}
            <aside className="account__sidebar">
              <ul className="account__menu">
                <li onClick={() => navigate("/account")}>
                  <User className="account__icon" /> Моя информация
                </li>
                <li onClick={() => navigate("/account/profile")}>
                  <User className="account__icon" /> Изменить контактную
                  информацию
                </li>
                <li onClick={() => navigate("/account/change-password")}>
                  <Key className="account__icon" /> Пароль
                </li>
                <li onClick={() => navigate("/account/favorites")}>
                  <Heart className="account__icon" /> Закладки
                </li>
                <li onClick={() => navigate("/account/orders")}>
                  <Clock className="account__icon" /> История заказов
                </li>
                <li onClick={logout} className="account__logout">
                  <LogOut className="account__logout-icon" /> Выйти
                </li>
              </ul>
            </aside>

            {/* 📄 Контент */}
            <div className="account__main">
              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
