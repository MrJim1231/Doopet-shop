// src/pages/Blog.jsx
import React from "react";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";
import BlogSection from "../components/BlogSection";

function Blog() {
  return (
    <div>
      <Header />
      <Breadcrumbs items={[{ label: "Блог" }]} />
      <BlogSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Blog;
