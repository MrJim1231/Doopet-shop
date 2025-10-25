import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

import graphicIcon from "../assets/icons/graphic-elements.svg";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке блога:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

      <section className="blog__content">
        <div className="blog__container">
          {loading ? (
            <p>Загрузка...</p>
          ) : blogs.length === 0 ? (
            <p>Пока нет статей</p>
          ) : (
            <div className="blog__items">
              {blogs.map((post) => (
                <div className="blog__item" key={post._id}>
                  <div className="blog__item-image-wrapper">
                    <img
                      src={post.imageUrl || post.image || "/no-image.jpg"}
                      alt={post.title}
                      className="blog__item-image"
                    />
                    {post.date && (
                      <div className="blog__item-date">{post.date}</div>
                    )}
                  </div>

                  <div className="blog__item-content">
                    <h3 className="blog__item-title">{post.title}</h3>
                    <p className="blog__item-description">
                      {post.description?.slice(0, 140)}...
                    </p>
                    <a href={`/blog/${post._id}`} className="blog__item-link">
                      Читать дальше ...
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="blog__footer">
            <button className="blog__button">Все статьи</button>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Blog;
