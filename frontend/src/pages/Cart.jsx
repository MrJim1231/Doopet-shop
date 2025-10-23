import { useEffect, useState } from "react";
import axios from "axios";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем или создаем sessionId (для гостей)
  const sessionId =
    localStorage.getItem("sessionId") ||
    (() => {
      const id = Math.random().toString(36).substring(2);
      localStorage.setItem("sessionId", id);
      return id;
    })();

  // Загрузка корзины
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cart", {
        params: { sessionId },
      });
      setCart(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    } finally {
      setLoading(false);
    }
  };

  // Увеличить/уменьшить количество
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put("http://localhost:5000/api/cart/update", {
        sessionId,
        productId,
        quantity: newQty,
      });
      fetchCart();
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  };

  // Удалить товар
  const removeFromCart = async (productId) => {
    if (!window.confirm("Удалить товар из корзины?")) return;
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        sessionId,
        productId,
      });
      fetchCart();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  // Очистить корзину
  const clearCart = async () => {
    if (!window.confirm("Очистить корзину?")) return;
    try {
      await axios.post("http://localhost:5000/api/cart/clear", { sessionId });
      fetchCart();
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
    }
  };

  // Подсчет итоговой суммы
  const total =
    cart?.items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  return (
    <div className="cart-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Корзина" }]} />

      <section className="cart">
        <div className="cart__container">
          <h2 className="cart__title">Ваша корзина</h2>

          {loading ? (
            <p>Загрузка...</p>
          ) : !cart?.items?.length ? (
            <p className="cart__empty">Корзина пуста</p>
          ) : (
            <>
              <div className="cart__items">
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="cart__item">
                    <div className="cart__item-info">
                      <img
                        src={
                          item.productId.image?.startsWith("http")
                            ? item.productId.image
                            : `http://localhost:5000${item.productId.image}`
                        }
                        alt={item.productId.name}
                        className="cart__item-image"
                      />
                      <div>
                        <h3 className="cart__item-name">
                          {item.productId.name}
                        </h3>
                        <p className="cart__item-price">
                          {item.price} € × {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="cart__item-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="cart__remove"
                        onClick={() => removeFromCart(item.productId._id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart__summary">
                <h3>
                  Итого: <span>{total.toFixed(2)} €</span>
                </h3>
                <button className="cart__clear" onClick={clearCart}>
                  Очистить корзину
                </button>
                <button className="cart__checkout">Перейти к оформлению</button>
              </div>
            </>
          )}
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Cart;
