import cat1Img from "../assets/images/cat2.png";
import cat2Img from "../assets/images/cat3.png";
import lapImg from "../assets/icons/lap.svg";

function Discounts() {
  return (
    <section className="discounts">
      <div className="discounts__container">
        <div className="discounts__items">
          {/* Первая карточка */}
          <div className="discounts__item discounts__item--purple">
            <div className="discounts__item-wrapper">
              <img
                src={cat1Img}
                alt="Cat 1"
                className="discounts__item-image discounts__item-image--first"
              />
              {/* Лапки */}
              <div className="discounts__item-laps">
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--1"
                />
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--2"
                />
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--3"
                />
              </div>
              <div className="discounts__item-content">
                <p className="discounts__item-title">Корм для котов</p>
                <h3 className="discounts__item-subtitle">Большие скидки</h3>
                <button className="discounts__item-btn">Экономьте 50%</button>
              </div>
            </div>
          </div>

          {/* Вторая карточка */}
          <div className="discounts__item discounts__item--green">
            <div className="discounts__item-wrapper">
              <img
                src={cat2Img}
                alt="Cat 2"
                className="discounts__item-image discounts__item-image--second"
              />
              {/* Лапки */}
              <div className="discounts__item-laps">
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--1"
                />
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--2"
                />
                <img
                  src={lapImg}
                  alt="Lap"
                  className="discounts__lap discounts__lap--3"
                />
              </div>
              <div className="discounts__item-content">
                <p className="discounts__item-title">Корм для котов</p>
                <h3 className="discounts__item-subtitle">KMR Kitten milk</h3>
                <button className="discounts__item-btn">Экономьте 50%</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Discounts;
