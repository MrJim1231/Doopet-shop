import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

function Contacts() {
  return (
    <div>
      <Header />
      <Breadcrumbs items={[{ label: "Контакты" }]} />

      <section className="contacts">
        <div className="contacts__container">
          <SectionHeader
            icon={graphicIcon}
            title="Контакты"
            baseClass="contacts__header"
          />

          <div className="contacts__info">
            <h3>Наше местонахождение</h3>
            <div className="contacts__card">
              <div>
                <strong>Интернет-магазин Doopet</strong>
                <p>Madonas novads, LV-4877, Латвия</p>
              </div>
              <div>
                <strong>Телефон</strong>
                <p>+371 28840340</p>
              </div>
            </div>
          </div>

          <div className="contacts__form-wrapper">
            <h3>Связаться с нами</h3>
            <form className="contacts__form">
              <label>
                Ваше имя <span>*</span>
                <input type="text" required />
              </label>

              <label>
                Ваш E-Mail <span>*</span>
                <input type="email" required />
              </label>

              <label>
                Ваш вопрос или сообщение <span>*</span>
                <textarea rows="5" required></textarea>
              </label>

              <div className="contacts__form-bottom">
                <label className="contacts__checkbox">
                  <input type="checkbox" required />
                  <span>
                    Я прочитал <a href="#">Политику безопасности</a> и согласен
                    с условиями безопасности и обработки персональных данных
                  </span>
                </label>
                <button type="submit">Отправить сообщение</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Contacts;
