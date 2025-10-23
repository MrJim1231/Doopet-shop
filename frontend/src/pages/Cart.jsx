import { useCart } from "../context/CartContext";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
import axios from "axios";

function Cart() {
  const { cart, loading, removeFromCart, clearCart, fetchCart } = useCart();

  // 🔹 Изменить количество
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return; // минимум 1
    try {
      const sessionId = localStorage.getItem("sessionId");
      await axios.put("http://localhost:5000/api/cart/update", {
        sessionId,
        productId,
        quantity: newQty,
      });
      await fetchCart(); // обновляем корзину
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  };

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
                      {/* 🔹 Кнопки изменения количества */}
                      <div className="cart__quantity">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* 🔹 Кнопка удаления */}
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
