import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // 🟢 добавляем
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import Footer from "../layout/Footer";
import SubscribeSection from "../components/SubscribeSection";
import graphicIcon from "../assets/icons/graphic-elements.svg";
import SectionHeader from "../components/SectionHeader";

function Order() {
  const { cart, fetchCart, clearCart } = useCart();
  const { user, token } = useAuth(); // 🟢 берём авторизацию
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      toast.warn("Заполните все поля");
      return;
    }

    try {
      setLoading(true);
      const sessionId = localStorage.getItem("sessionId");

      // 🔥 Формируем тело запроса
      const body = {
        userId: user?._id || null, // 🟢 передаём userId
        sessionId,
        customer,
      };

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      console.log("[Создание заказа] Отправляем тело:", body);
      console.log("[Создание заказа] С токеном:", !!token);

      const res = await axios.post("http://localhost:5000/api/orders", body, {
        headers,
      });

      toast.success("✅ Заказ успешно оформлен!", {
        position: "bottom-right",
        autoClose: 2000,
      });

      await clearCart();
      await fetchCart();
      console.log("Создан заказ:", res.data);
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
      toast.error("❌ Не удалось оформить заказ");
    } finally {
      setLoading(false);
    }
  };

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
  const delivery = 1.2;
  const vat = subtotal * 0.21;
  const total = subtotal + delivery + vat;

  return (
    <div className="order-page">
      <Header />
      <Breadcrumbs items={[{ label: "Оформление заказа" }]} />

      <section className="order">
        <div className="order__container">
          <SectionHeader
            icon={graphicIcon}
            title="Оформление заказа"
            baseClass="order__header"
          />

          <div className="order__content">
            <form className="order__form" onSubmit={handleSubmit}>
              <h3>Данные покупателя</h3>
              <input
                type="text"
                name="name"
                placeholder="Имя и фамилия"
                value={customer.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={customer.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={customer.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Адрес доставки"
                value={customer.address}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Оформляем..." : "Подтвердить заказ"}
              </button>
            </form>

            <div className="order__summary">
              <h3>Ваш заказ</h3>
              <ul>
                {cart?.items?.map((item) => (
                  <li key={item.productId._id}>
                    {item.productId.name} × {item.quantity} —{" "}
                    {item.totalPrice.toFixed(2)}€
                  </li>
                ))}
              </ul>

              <p>Промежуточный итог: {subtotal.toFixed(2)}€</p>
              <p>Доставка: {delivery.toFixed(2)}€</p>
              <p>НДС (21%): {vat.toFixed(2)}€</p>
              <h4>Итого: {total.toFixed(2)}€</h4>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Order;
