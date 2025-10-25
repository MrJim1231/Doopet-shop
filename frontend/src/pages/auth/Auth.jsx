import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "../../layout/Header";
import Breadcrumbs from "../../layout/Breadcrumbs";
import SubscribeSection from "../../components/SubscribeSection";
import Footer from "../../layout/Footer";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* 🔹 Верхняя часть сайта */}

      <Header />
      <Breadcrumbs
        items={[{ label: isLogin ? "Вход в личный кабинет" : "Регистрация" }]}
      />

      {/* 🔹 Контент страницы авторизации */}
      <section className="auth">
        <div className="auth__container">
          <div className="auth__tabs">
            <button
              className={`auth__tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Вход
            </button>
            <button
              className={`auth__tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>

          <div className="auth__content">
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </section>

      {/* 🔹 Подписка и футер */}
      <SubscribeSection />
      <Footer />
    </>
  );
}

export default Auth;
