import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./components/Catalog";
import Product from "./pages/Product";
import Stock from "./pages/Stock";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AddPost from "./admin/AddPost"; // ✅ добавлен импорт
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/promotions" element={<Stock />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/add-post" element={<AddPost />} />{" "}
            {/* ✅ новый маршрут */}
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
