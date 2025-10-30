import { useState, useEffect } from "react";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import Footer from "../layout/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import graphicIcon from "../assets/icons/graphic-elements.svg";
import SectionHeader from "../components/SectionHeader";

function Checkout() {
  const { cart, fetchCart, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState("guest");
  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    zip: "",
    region: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]); // 🆕 список адресов пользователя
  const [delivery, setDelivery] = useState("fixed");
  const [payment, setPayment] = useState("cash");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
  const deliveryCost = 5;
  const total = subtotal + deliveryCost;

  // 🟢 Загружаем корзину и адреса при авторизации
  useEffect(() => {
    fetchCart();

    if (user && token) {
      axios
        .get("http://localhost:5000/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setSavedAddresses(res.data))
        .catch((err) => console.error("Ошибка загрузки адресов:", err));
    }
  }, [user]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (id) => {
    const selected = savedAddresses.find((a) => a._id === id);
    if (selected) {
      setCustomer({
        ...customer,
        address: selected.address,
        city: selected.city,
        zip: selected.zip || "",
        region: selected.region || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, phone, address, city, zip, region } = customer;
    if (!name || !email || !phone || !address || !city) {
      toast.warn("⚠️ Заполните обязательные поля");
      setIsSubmitting(false);
      return;
    }

    try {
      const sessionId = localStorage.getItem("sessionId");

      // 🟢 Формируем тело заказа
      const body = {
        userId: user?._id || null,
        sessionId,
        customer: {
          name: `${customer.name} ${customer.surname}`.trim(),
          email: customer.email,
          phone: customer.phone,
          address,
          city,
          zip,
          region,
        },
        comment,
        delivery,
        payment,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
        })),
        total,
      };

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // 📨 Отправка заказа
      const res = await axios.post("http://localhost:5000/api/orders", body, {
        headers,
      });

      toast.success("✅ Заказ успешно оформлен!", {
        position: "bottom-right",
        autoClose: 2000,
      });

      // 🧩 Если пользователь авторизован — проверим, есть ли адрес в списке
      if (user && token) {
        const exists = savedAddresses.some(
          (a) =>
            a.address.toLowerCase() === address.toLowerCase() &&
            a.city.toLowerCase() === city.toLowerCase() &&
            (a.zip || "") === (zip || "")
        );

        // ➕ Если нет — добавляем его в адреса
        if (!exists) {
          try {
            await axios.post(
              "http://localhost:5000/api/addresses",
              { address, city, region, zip },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("✅ Новый адрес сохранён");
          } catch (saveErr) {
            console.warn("⚠️ Не удалось сохранить новый адрес:", saveErr);
          }
        }
      }

      await clearCart();
      await fetchCart();

      setMessage(
        `✅ Заказ №${res.data._id.slice(-6).toUpperCase()} успешно оформлен!`
      );

      setTimeout(() => navigate("/account/orders"), 2000);
    } catch (err) {
      console.error("❌ Ошибка оформления заказа:", err);
      toast.error("❌ Не удалось оформить заказ", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setMessage("❌ Ошибка при оформлении заказа");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      <Breadcrumbs items={[{ label: "Оформление заказа" }]} />

      <section className="checkout">
        <div className="checkout__container">
          <SectionHeader
            icon={graphicIcon}
            title="Оформление заказа"
            baseClass="checkout__header"
          />

          <form onSubmit={handleSubmit}>
            {/* Шаг 1 */}
            <div className="checkout__step">
              <h3>Шаг 1: Способы оформления заказа</h3>
              <div className="checkout__step-box">
                <div className="checkout__block">
                  <h4>Новый покупатель</h4>
                  <label>
                    <input
                      type="radio"
                      value="register"
                      checked={method === "register"}
                      onChange={() => setMethod("register")}
                    />
                    Регистрация
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="guest"
                      checked={method === "guest"}
                      onChange={() => setMethod("guest")}
                    />
                    Без регистрации
                  </label>
                </div>

                <div className="checkout__block">
                  <h4>Зарегистрированный пользователь</h4>
                  <input type="email" placeholder="Ваш email" />
                  <input type="password" placeholder="Ваш пароль" />
                  <button type="button" className="btn-small">
                    Войти
                  </button>
                </div>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className="checkout__step">
              <h3>Шаг 2: Данные покупателя</h3>
              <div className="checkout__step-box">
                <div className="checkout__block">
                  <h4>Личные данные</h4>
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя *"
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Фамилия *"
                    value={customer.surname}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-Mail *"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон *"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout__block">
                  <h4>Адрес доставки</h4>

                  {/* 🟢 Выбор сохранённого адреса */}
                  {savedAddresses.length > 0 && (
                    <div className="checkout__saved-addresses">
                      <label>Выбрать сохранённый адрес:</label>
                      <select
                        onChange={(e) => handleSelectAddress(e.target.value)}
                        defaultValue=""
                      >
                        <option value="">— Выберите адрес —</option>
                        {savedAddresses.map((addr) => (
                          <option key={addr._id} value={addr._id}>
                            {addr.city}, {addr.address}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <input
                    type="text"
                    name="address"
                    placeholder="Адрес *"
                    value={customer.address}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Город *"
                    value={customer.city}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Почтовый индекс"
                    value={customer.zip}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="region"
                    placeholder="Регион / область"
                    value={customer.region}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Доставка */}
            <div className="checkout__step">
              <h3>Шаг 3: Способ доставки</h3>
              <div className="checkout__block">
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="fixed"
                    checked={delivery === "fixed"}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  Доставка с фиксированной стоимостью — 5 €
                </label>

                <textarea
                  placeholder="Комментарий к заказу"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            {/* Оплата */}
            <div className="checkout__step">
              <h3>Шаг 4: Оплата</h3>
              <div className="checkout__block">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Оплата при доставке
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Оплата картой
                </label>
              </div>
            </div>

            {/* Подтверждение */}
            <div className="checkout__step">
              <h3>Шаг 5: Подтверждение заказа</h3>
              <table className="checkout__table">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.productId._id}>
                      <td>{item.productId.name}</td>
                      <td>{item.price}€</td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="checkout__summary">
                <p>Сумма: {subtotal.toFixed(2)}€</p>
                <p>Доставка: {deliveryCost.toFixed(2)}€</p>
                <p>
                  <strong>Итого: {total.toFixed(2)}€</strong>
                </p>
              </div>

              <button
                type="submit"
                className="checkout__submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Оформляем..." : "Подтвердить заказ"}
              </button>

              {message && <p className="checkout__message">{message}</p>}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Checkout;
