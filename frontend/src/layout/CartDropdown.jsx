import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import trashIcon from "../assets/icons/trash.svg";
import placeholderImg from "../assets/images/no-image.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function CartDropdown() {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className="cart-dropdown">
      {cart.items.length > 0 ? (
        <>
          <ul className="cart-dropdown__list">
            {cart.items.map((item) => (
              <li key={item._id} className="cart-dropdown__item">
                <img
                  src={
                    item.productId?.image?.startsWith("http")
                      ? item.productId.image
                      : `${API_URL}${item.productId?.image || ""}`
                  }
                  onError={(e) => (e.target.src = placeholderImg)}
                  alt={item.productId?.name}
                  className="cart-dropdown__image"
                />
                <div className="cart-dropdown__info">
                  <p className="cart-dropdown__name">
                    {item.productId?.name || "Без названия"}
                  </p>
                  <span className="cart-dropdown__quantity">
                    x{item.quantity}
                  </span>
                  <span className="cart-dropdown__price">
                    {item.totalPrice.toFixed(2)} €
                  </span>
                </div>
                <button
                  className="cart-dropdown__remove"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  <img src={trashIcon} alt="Удалить" />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-dropdown__summary">
            <div className="cart-dropdown__row">
              <span>Сумма:</span>
              <strong>{totalPrice.toFixed(2)} €</strong>
            </div>
            <div className="cart-dropdown__row total">
              <span>Итого:</span>
              <strong>{totalPrice.toFixed(2)} €</strong>
            </div>
          </div>

          <div className="cart-dropdown__actions">
            <Link
              to="/cart"
              className="cart-dropdown__btn cart-dropdown__btn--gray"
            >
              Перейти в корзину
            </Link>
            <Link
              to="/checkout"
              className="cart-dropdown__btn cart-dropdown__btn--accent"
            >
              Оформить заказ
            </Link>
          </div>
        </>
      ) : (
        <p className="cart-dropdown__empty">Ваша корзина пуста 😺</p>
      )}
    </div>
  );
}

export default CartDropdown;
