// src/components/BlogSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function BlogSection() {
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
    <>
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
                    {/* ✅ заменили a на Link */}
                    <Link to={`/blog/${post._id}`} className="blog__item-link">
                      Читать дальше ...
                    </Link>
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
    </>
  );
}

export default BlogSection;
