import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import Footer from "../layout/Footer";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(res.data);
      console.log("📦 Заказы загружены:", res.data);
    } catch (err) {
      console.error("❌ Ошибка при загрузке заказов:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="orders__auth-required">
        <Header />
        <p className="orders__auth-text">
          ⚠️ Чтобы просматривать заказы, пожалуйста, авторизуйтесь.
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* <Header /> */}
      {/* <Breadcrumbs items={[{ label: "Мои заказы" }]} /> */}

      <section className="orders">
        <div className="orders__container">
          {/* <SectionHeader
            icon={graphicIcon}
            title="Мои заказы"
            baseClass="orders__header"
          /> */}

          {loading ? (
            <p>Загрузка заказов...</p>
          ) : orders.length === 0 ? (
            <p className="orders__empty">У вас пока нет заказов 🛍️</p>
          ) : (
            <div className="orders__list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card__header">
                    <h3>Заказ №{order._id.slice(-6).toUpperCase()}</h3>
                    <span
                      className={`order-card__status order-card__status--${order.status}`}
                    >
                      {order.status === "pending"
                        ? "В обработке"
                        : order.status === "paid"
                        ? "Оплачен"
                        : order.status === "shipped"
                        ? "Отправлен"
                        : order.status === "completed"
                        ? "Завершён"
                        : "Отменён"}
                    </span>
                  </div>

                  <div className="order-card__body">
                    {order.items?.length > 0 ? (
                      <ul className="order-card__items">
                        {order.items.map((item) => (
                          <li key={item._id} className="order-card__item">
                            <img
                              src={
                                item.productId?.image?.startsWith("http")
                                  ? item.productId.image
                                  : `http://localhost:5000${
                                      item.productId?.image || ""
                                    }`
                              }
                              alt={item.productId?.name}
                              className="order-card__image"
                            />
                            <div className="order-card__info">
                              <p className="order-card__name">
                                {item.productId?.name || "Без названия"}
                              </p>
                              <p className="order-card__qty">
                                Кол-во: {item.quantity}
                              </p>
                              <p className="order-card__price">
                                Цена: {item.price.toFixed(2)}€
                              </p>
                            </div>
                            <p className="order-card__total">
                              {(item.totalPrice || 0).toFixed(2)}€
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Товары не найдены</p>
                    )}
                  </div>

                  <div className="order-card__footer">
                    <p>
                      <strong>Итого:</strong> {order.total.toFixed(2)} €
                    </p>
                    <p>
                      <strong>Дата:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString("ru-RU")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

export default Orders;
