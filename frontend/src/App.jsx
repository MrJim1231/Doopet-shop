import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Stock from "./pages/Stock";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import CategoryProducts from "./pages/CategoryProducts";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product" element={<Product />} />
          <Route path="/promotions" element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
        </Routes>
      </div>
    </Router>
  );
}
