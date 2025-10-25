import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Blog() {
  return (
    <div>
      <Header />

      <Breadcrumbs items={[{ label: "Блог" }]} />

      <section className="blog">
        <div className="container">
          <SectionHeader
            icon={graphicIcon}
            title="Блог"
            baseClass="blog__header"
          />
        </div>
      </section>
    </div>
  );
}

export default Blog;
