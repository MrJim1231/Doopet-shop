import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Stock() {
  return (
    <div>
      <Header />
      <Breadcrumbs items={[{ label: "Акции" }]} />

      <section className="stock">
        <div className="container">
          <SectionHeader
            icon={graphicIcon}
            title="Акции"
            baseClass="stock__header"
          />
        </div>
      </section>
    </div>
  );
}

export default Stock;
