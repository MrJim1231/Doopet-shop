import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

import HeaderTopBar from "../../layout/HeaderTopBar";
import Header from "../../layout/Header";
import CatalogBlock from "../../layout/CatalogBlock";
import Breadcrumbs from "../../layout/Breadcrumbs";
import SubscribeSection from "../../components/SubscribeSection";
import Footer from "../../layout/Footer";

import Filters from "./Filters";
import Controls from "./Controls";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

function CategoryProducts() {
  const { id } = useParams();
  const {
    products,
    categoryName,
    loading,
    currentPage,
    totalPages,
    totalProducts,
    limit,
    setLimit,
    setCurrentPage,
  } = useProducts(id);

  const [minPrice, setMinPrice] = useState(15);
  const [maxPrice, setMaxPrice] = useState(60);
  const [packageSize, setPackageSize] = useState("2kg");

  return (
    <div className="catalog-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: categoryName || "Категория" }]} />

      <section className="catalog">
        <div className="catalog__container">
          <Filters
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            packageSize={packageSize}
            setPackageSize={setPackageSize}
          />

          <div className="catalog__content">
            <Controls
              limit={limit}
              setLimit={setLimit}
              setCurrentPage={setCurrentPage}
            />
            <ProductGrid products={products} loading={loading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default CategoryProducts;
