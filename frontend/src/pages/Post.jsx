import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import graphicIcon from "../assets/icons/graphic-elements.svg";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Загружаем выбранный пост
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке статьи:", err);
      }
    };

    const fetchOtherPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setOtherPosts(res.data.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Ошибка при загрузке других статей:", err);
      }
    };

    Promise.all([fetchPost(), fetchOtherPosts()]).then(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>;
  if (!post) return <p style={{ textAlign: "center" }}>Статья не найдена</p>;

  return (
    <div>
      <Header />
      <Breadcrumbs
        items={[{ label: "Блог", link: "/blog" }, { label: post.title }]}
      />

      <section className="post">
        <div className="post__container">
          <div className="post__main">
            <div className="post__content">
              <div className="post__image-wrapper">
                <img
                  src={post.imageUrl || post.image || "/no-image.jpg"}
                  alt={post.title}
                  className="post__image"
                />
                {post.date && <div className="post__date">{post.date}</div>}
              </div>

              <h2 className="post__title">{post.title}</h2>
              <p className="post__text">{post.description}</p>
            </div>

            <aside className="post__sidebar">
              <div className="post__search">
                <h3 className="post__sidebar-title">Искать в блоге</h3>
                <div className="post__search-input">
                  <input type="text" placeholder="Что искать" />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.36 5.59 12.28 3 8.5 3S1.64 5.59 1.09 8.39a6.5 6.5 0 0010.9 5.34l.27.28v.79l4.25 4.25c.39.39 1.02.39 1.41 0l.71-.71a.996.996 0 000-1.41L15.5 14zM3.5 8.5C3.5 6.01 5.51 4 8 4s4.5 2.01 4.5 4.5S10.49 13 8 13s-4.5-2.01-4.5-4.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="post__others">
                <h3 className="post__sidebar-title">Ещё статьи</h3>
                <div className="post__others-list">
                  {otherPosts.slice(0, 3).map((item) => (
                    <Link
                      to={`/blog/${item._id}`}
                      key={item._id}
                      className="post__other-item"
                    >
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.title}
                        className="post__other-image"
                      />
                      <div>
                        <p className="post__other-title">{item.title}</p>
                        {item.date && (
                          <span className="post__other-date">{item.date}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default Post;
