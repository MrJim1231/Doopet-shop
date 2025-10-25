import { useState } from "react";
import bannerImg from "../assets/images/banner-desktop.png";
import bannerImg2 from "../assets/images/banner-desktop.png";
import bannerImg3 from "../assets/images/banner-desktop.png";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const slides = [
  { id: 1, img: bannerImg },
  { id: 2, img: bannerImg },
  { id: 3, img: bannerImg },
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="banner">
      {/* Кнопка влево */}
      <button
        className="banner__arrow banner__arrow--left"
        onClick={handlePrev}
        aria-label="Назад"
      >
        <img src={arrowLeft} alt="Назад" />
      </button>

      {/* Контейнер с изображением */}
      <div className="banner__container">
        <div className="banner__image-wrapper">
          <img
            src={slides[currentIndex].img}
            alt={`Слайд ${currentIndex + 1}`}
            className="banner__image"
          />
        </div>

        {/* Точки-переключатели */}
        <div className="banner__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={currentIndex === index ? "active" : ""}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Кнопка вправо */}
      <button
        className="banner__arrow banner__arrow--right"
        onClick={handleNext}
        aria-label="Вперед"
      >
        <img src={arrowRight} alt="Вперед" />
      </button>
    </section>
  );
}

export default Banner;
