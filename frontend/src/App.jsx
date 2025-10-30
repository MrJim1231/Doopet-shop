import { Routes, Route } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";

import Home from "./pages/Home";
import Catalog from "./components/Catalog";
import Product from "./pages/Product";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post"; // ✅ Добавь этот импорт
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AddPost from "./admin/AddPost";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Cart from "./pages/Cart";

import AccountLayout from "./pages/account/AccountLayout";
import AccountMain from "./pages/account/AccountMain";
import Favorites from "./pages/account/Favorites";
import Orders from "./pages/account/Orders";
import Checkout from "./pages/Checkout";
import Profile from "./pages/account/Profile";
import ChangePassword from "./pages/account/ChangePassword";

// 🔑 Авторизация
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <div className="app">
      <ToastProvider />

      <Routes>
        {/* 🌍 Основные страницы */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Post />} />{" "}
        {/* ✅ теперь Post определён */}
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* 👤 Личный кабинет */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountMain />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        {/* 🔑 Авторизация */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* 🛠️ Админка */}
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-post" element={<AddPost />} />
      </Routes>
    </div>
  );
}
