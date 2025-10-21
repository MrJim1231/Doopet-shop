import deliveryIcon from "../assets/icons/delivery.svg";
import carIcon from "../assets/icons/car.svg";
import shopIcon from "../assets/icons/shop.svg";
import teamIcon from "../assets/icons/team.svg";

function Advantages() {
  return (
    <section className="advantages">
      <div className="advantages__container">
        <div className="advantages__items">
          <div className="advantages__item">
            <div className="advantages__icon-wrapper">
              <img
                src={deliveryIcon}
                alt="Бесплатная доставка"
                className="advantages__icon"
              />
            </div>
            <div className="advantages__content">
              <h3 className="advantages__title">Бесплатная доставка</h3>
              <p className="advantages__text">
                по Риге на все покупки свыше 20 €
              </p>
            </div>
          </div>

          <div className="advantages__item">
            <div className="advantages__icon-wrapper">
              <img
                src={carIcon}
                alt="Быстро и надёжно"
                className="advantages__icon"
              />
            </div>
            <div className="advantages__content">
              <h3 className="advantages__title">Быстро и надёжно</h3>
              <p className="advantages__text">доставка в день заказа</p>
            </div>
          </div>

          <div className="advantages__item">
            <div className="advantages__icon-wrapper">
              <img
                src={shopIcon}
                alt="Получи товар в магазине"
                className="advantages__icon"
              />
            </div>
            <div className="advantages__content">
              <h3 className="advantages__title">Получи товар в магазине</h3>
              <p className="advantages__text">
                выбери удобный для себя магазин
              </p>
            </div>
          </div>

          <div className="advantages__item">
            <div className="advantages__icon-wrapper">
              <img
                src={teamIcon}
                alt="Команда профессионалов"
                className="advantages__icon"
              />
            </div>
            <div className="advantages__content">
              <h3 className="advantages__title">Команда профессионалов</h3>
              <p className="advantages__text">
                наши специалисты дадут вам ценные консультации
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
