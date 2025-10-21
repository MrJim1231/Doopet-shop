import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Banner from "../components/Banner";
import Advantages from "../components/Advantages";
import Categories from "../components/Categories";
import PopularProducts from "../components/PopularProducts";
import RecommendedProducts from "../components/RecommendedProducts";
import Discounts from "../components/Discounts";
import Blog from "../components/Blog";
import Partners from "../components/Partners";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <div>
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Banner />
      <Advantages />
      <Categories />
      <PopularProducts />
      <RecommendedProducts />
      <Discounts />
      <Blog />
      <Partners />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Home;
