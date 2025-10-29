import Header from "../../layout/Header";
import Breadcrumbs from "../../layout/Breadcrumbs";
import SubscribeSection from "../../components/SubscribeSection";
import Footer from "../../layout/Footer";
import { Outlet, useLocation, Link } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();

  const isLogin = location.pathname.includes("login");

  return (
    <>
      <Header />
      <Breadcrumbs
        items={[{ label: isLogin ? "Вход в личный кабинет" : "Регистрация" }]}
      />

      <section className="auth">
        <div className="auth__container">
          <div className="auth__tabs">
            <Link
              to="/auth/login"
              className={`auth__tab ${isLogin ? "active" : ""}`}
            >
              Вход
            </Link>
            <Link
              to="/auth/register"
              className={`auth__tab ${!isLogin ? "active" : ""}`}
            >
              Регистрация
            </Link>
          </div>

          <div className="auth__content">
            <Outlet /> {/* здесь будет либо Login, либо Register */}
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </>
  );
}
