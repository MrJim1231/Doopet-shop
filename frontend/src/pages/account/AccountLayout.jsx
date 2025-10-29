import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../layout/Header";
import Breadcrumbs from "../../layout/Breadcrumbs";
import Footer from "../../layout/Footer";
import SectionHeader from "../../components/SectionHeader";
import graphicIcon from "../../assets/icons/graphic-elements.svg";
import { LogOut, Heart, User, Clock } from "lucide-react";
import { useEffect } from "react";

export default function AccountLayout() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Редирект только после загрузки, если пользователь не авторизован
  useEffect(() => {
    if (!loading && !user && location.pathname.startsWith("/account")) {
      navigate("/auth/login");
    }
  }, [loading, user, location.pathname, navigate]);

  // ⏳ Загрузка профиля
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

  // ⚠️ Если нет пользователя после загрузки (редирект сработает)
  if (!user) {
    return null;
  }

  // 🧭 Заголовок и хлебные крошки
  const getTitle = () => {
    if (location.pathname.includes("favorites")) return "Закладки";
    if (location.pathname.includes("orders")) return "История заказов";
    return "Личный кабинет";
  };

  const getBreadcrumbs = () => {
    const crumbs = [{ label: "Личный кабинет", path: "/account" }];
    if (location.pathname.includes("favorites"))
      crumbs.push({ label: "Закладки" });
    if (location.pathname.includes("orders"))
      crumbs.push({ label: "История заказов" });
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

            {/* 📄 Контент (через <Outlet />) */}
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
