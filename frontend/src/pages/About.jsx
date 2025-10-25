import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function About() {
  return (
    <div>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "О нас" }]} />

      <section className="about">
        <div className="container">
          <SectionHeader
            icon={graphicIcon}
            title="О нас"
            baseClass="about__header"
          />

          {/* Здесь можешь добавить основной контент страницы "О нас" */}
        </div>
      </section>
    </div>
  );
}

export default About;
