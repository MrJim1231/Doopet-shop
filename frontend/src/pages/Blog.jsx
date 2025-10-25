import React from "react";
import Header from "../layout/Header";
import Breadcrumbs from "../layout/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

import catDogImg1 from "../assets/images/cat-dog.jpg";
import catDogImg2 from "../assets/images/cat-dog2.jpg";
import catDogImg3 from "../assets/images/cat-dog3.jpg";
import graphicIcon from "../assets/icons/graphic-elements.svg";

function Blog() {
  const blogPosts = [
    {
      img: catDogImg1,
      date: "30 сен, 2022",
      title: "Уход за кошками и собаками",
      description:
        "Советы и рекомендации от опытных владельцев питомцев и экспертов в области ветеринарии...",
    },
    {
      img: catDogImg2,
      date: "30 сен, 2022",
      title: "Хвостатые Друзья",
      description:
        "Наши хвостатые друзья — искренние спутники, которые приносят радость и тепло в наши жизни...",
    },
    {
      img: catDogImg3,
      date: "30 сен, 2022",
      title: "Как выгуливать собак?",
      description:
        "Узнайте секреты успешного выгула вашей собаки. В нашем блоге мы предоставляем практические...",
    },
  ];

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
          <div className="blog__items">
            {blogPosts.map((post, index) => (
              <div className="blog__item" key={index}>
                <div className="blog__item-image-wrapper">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="blog__item-image"
                  />
                  <div className="blog__item-date">{post.date}</div>
                </div>

                <div className="blog__item-content">
                  <h3 className="blog__item-title">{post.title}</h3>
                  <p className="blog__item-description">{post.description}</p>
                  <a href="#" className="blog__item-link">
                    Читать дальше ...
                  </a>
                </div>
              </div>
            ))}
          </div>

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
