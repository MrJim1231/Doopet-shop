import { useCart } from "../context/CartContext";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
import axios from "axios";

function Cart() {
  const { cart, loading, removeFromCart, clearCart, updateQuantityLocally } =
    useCart();

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;

    updateQuantityLocally(productId, newQty);

    try {
      const sessionId = localStorage.getItem("sessionId");
      await axios.put("http://localhost:5000/api/cart/update", {
        sessionId,
        productId,
        quantity: newQty,
      });
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
  const delivery = 1.2;
  const vat = subtotal * 0.21;
  const total = subtotal + delivery + vat;

  return (
    <div className="cart-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Корзина" }]} />

      <section className="cart">
        <div className="container">
          <h2 className="cart__title">🦴 Корзина</h2>

          {loading ? (
            <p>Загрузка...</p>
          ) : !cart?.items?.length ? (
            <p className="cart__empty">Корзина пуста</p>
          ) : (
            <>
              <table className="cart__table">
                <thead>
                  <tr>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Итоговая цена</th>
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.productId._id}>
                      <td>
                        <img
                          src={
                            item.productId.image?.startsWith("http")
                              ? item.productId.image
                              : `http://localhost:5000${item.productId.image}`
                          }
                          alt={item.productId.name}
                          style={{ width: "60px" }}
                        />
                      </td>
                      <td>{item.productId.name}</td>
                      <td>{item.price.toFixed(2)}€</td>
                      <td>
                        <div className="quantity-control">
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
                      </td>
                      <td>{item.totalPrice.toFixed(2)}€</td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item.productId._id)}
                          className="delete-btn"
                          title="Удалить"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart__summary-box">
                <table className="cart__summary">
                  <tbody>
                    <tr>
                      <td>Промежуточный итог</td>
                      <td>{subtotal.toFixed(2)}€</td>
                    </tr>
                    <tr>
                      <td>Доставка</td>
                      <td>{delivery.toFixed(2)}€</td>
                    </tr>
                    <tr>
                      <td>НДС (21%)</td>
                      <td>{vat.toFixed(2)}€</td>
                    </tr>
                    <tr className="cart__summary-total">
                      <td>
                        <strong>Итого</strong>
                      </td>
                      <td>
                        <strong>{total.toFixed(2)}€</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button className="cart__checkout-btn">
                  Перейти к оформлению заказа
                </button>
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
