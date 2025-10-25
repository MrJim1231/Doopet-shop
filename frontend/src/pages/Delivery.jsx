import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Delivery() {
  return (
    <div>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: "Доставка и оплата" }]} />

      <section className="delivery">
        <div className="container">
          <SectionHeader
            icon={graphicIcon}
            title="Доставка и оплата"
            baseClass="delivery__header"
          />
        </div>
      </section>
    </div>
  );
}

export default Delivery;
