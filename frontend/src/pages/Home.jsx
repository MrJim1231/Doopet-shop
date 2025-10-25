import Header from "../layout/Header";
import Banner from "../components/Banner";
import Advantages from "../components/Advantages";
import Categories from "../components/Categories";
import PopularProducts from "../components/PopularProducts";
import RecommendedProducts from "../components/RecommendedProducts";
import Discounts from "../components/Discounts";
import BlogSection from "../components/BlogSection";
import Partners from "../components/Partners";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <>
      <Header /> {/* шапка сайта */}
      <main className="main">
        <Banner />
        <Advantages />
        <Categories />
        <PopularProducts />
        <RecommendedProducts />
        <Discounts />
        <BlogSection />
        <Partners />
        <SubscribeSection />
      </main>
      <Footer /> {/* подвал */}
    </>
  );
};

export default Home;
