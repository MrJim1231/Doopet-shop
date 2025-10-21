import dogImg from "../assets/images/dog-subcription.png";

function SubscribeSection() {
  return (
    <section className="subscribe">
      <div className="subscribe__container">
        <div className="subscribe__content">
          <h2 className="subscribe__title">
            Будьте в курсе <br /> наших акций и новостей
          </h2>
          <p className="subscribe__text">
            Подпишитесь на рассылку и первым узнавайте о скидках
          </p>

          <form className="subscribe__form">
            <div className="subscribe__input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                className="subscribe__input"
                // autoComplete="email"
              />
              <button type="submit" className="subscribe__button">
                Отправить
              </button>
            </div>
          </form>
        </div>

        <div className="subscribe__image-wrapper">
          <img src={dogImg} alt="Dog" className="subscribe__image" />
        </div>
      </div>
    </section>
  );
}

export default SubscribeSection;
