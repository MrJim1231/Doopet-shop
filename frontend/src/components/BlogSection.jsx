import React from "react";
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
    <section className="blog-section">
      <div className="blog-section__container">
        <div className="blog-section__header">
          <img src={graphicIcon} alt="icon" className="blog-section__icon" />
          <h2 className="blog-section__title">Блог</h2>
        </div>

        <div className="blog-section__items">
          {blogPosts.map((post, index) => (
            <div className="blog-section__item" key={index}>
              <div className="blog-section__item-image-wrapper">
                <img
                  src={post.img}
                  alt={post.title}
                  className="blog-section__item-image"
                />
                <div className="blog-section__item-date">{post.date}</div>
              </div>

              <div className="blog-section__item-content">
                <h3 className="blog-section__item-title">{post.title}</h3>
                <p className="blog-section__item-description">
                  {post.description}
                </p>
                <a href="#" className="blog-section__item-link">
                  Читать дальше ...
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-section__footer">
          <button className="blog-section__button">Все статьи</button>
        </div>
      </div>
    </section>
  );
}

export default Blog;
