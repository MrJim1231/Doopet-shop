import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
import graphicIcon from "../assets/icons/graphic-elements.svg";
import SectionHeader from "../components/SectionHeader";

function Cart() {
  const {
    cart,
    loading,
    removeFromCart,
    removeFromCartLocally,
    updateQuantityLocally,
  } = useCart();

  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    if (!loading && typeof cart.items !== "undefined") {
      setDisplayItems(cart.items);
    }
  }, [cart.items, loading]);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;

    // локально
    updateQuantityLocally(productId, newQty);
    setDisplayItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQty, totalPrice: item.price * newQty }
          : item
      )
    );

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

  const handleRemove = async (productId) => {
    // локально
    removeFromCartLocally(productId);
    setDisplayItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );

    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const subtotal =
    displayItems.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
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
        <div className="cart__container">
          <SectionHeader
            icon={graphicIcon}
            title="Корзина"
            baseClass="cart__header"
          />

          {loading ? (
            <p>Загрузка...</p>
          ) : displayItems.length > 0 ? (
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
                  {displayItems.map((item) => (
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
                          onClick={() => handleRemove(item.productId._id)}
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
          ) : (
            <p className="cart__empty">Корзина пуста</p>
          )}
        </div>
      </section>

      {!loading && (
        <>
          <SubscribeSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Cart;
