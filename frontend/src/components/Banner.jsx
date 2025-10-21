import bannerImg from "../assets/images/banner-desktop.png";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

function Banner() {
  return (
    <section className="banner">
      {/* Кнопка влево */}
      <button className="banner__arrow banner__arrow--left" aria-label="Назад">
        <img src={arrowLeft} alt="Назад" />
      </button>

      {/* Контейнер с изображением */}
      <div className="banner__container">
        <div className="banner__image-wrapper">
          <img src={bannerImg} alt="Love your pet" className="banner__image" />
        </div>
      </div>

      {/* Кнопка вправо */}
      <button
        className="banner__arrow banner__arrow--right"
        aria-label="Вперед"
      >
        <img src={arrowRight} alt="Вперед" />
      </button>
    </section>
  );
}

export default Banner;
