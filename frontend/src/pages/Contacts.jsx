import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Contacts() {
  return (
    <div>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Контакты" }]} />

      <section className="contacts">
        <div className="container">
          <SectionHeader
            icon={graphicIcon}
            title="Контакты"
            baseClass="contacts__header"
          />
        </div>
      </section>
    </div>
  );
}

export default Contacts;
