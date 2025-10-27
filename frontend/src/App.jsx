import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";

import Home from "./pages/Home";
import Catalog from "./components/Catalog";
import Product from "./pages/Product";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AddPost from "./admin/AddPost";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import Post from "./pages/Post";
// import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* ✅ Глобальные уведомления */}
        <ToastProvider />

        <Routes>
          {/* Основные страницы */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Админка */}
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-post" element={<AddPost />} />
          {/* Прочие страницы */}
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="/order" element={<Order />} />{" "} */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          {/* ✅ добавить маршрут */}
        </Routes>
      </div>
    </Router>
  );
}
