import dogImg from "../assets/images/dog.png";
import catImg from "../assets/images/cat.png";

function Categories() {
  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__items">
          <div className="categories__item">
            <div className="categories__image-wrapper">
              <img src={dogImg} alt="Для собак" className="categories__image" />
            </div>
            <p className="categories__title">Для собак</p>
          </div>

          <div className="categories__item">
            <div className="categories__image-wrapper">
              <img src={catImg} alt="Для кошек" className="categories__image" />
            </div>
            <p className="categories__title">Для кошек</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
