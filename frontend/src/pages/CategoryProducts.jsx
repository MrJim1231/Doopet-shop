import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import HeaderTopBar from "../layout/HeaderTopBar";
import Header from "../layout/Header";
import CatalogBlock from "../layout/CatalogBlock";
import Breadcrumbs from "../layout/Breadcrumbs";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../layout/Footer";

function CategoryProducts() {
  const { id } = useParams(); // id категории
  const [minPrice, setMinPrice] = useState(15);
  const [maxPrice, setMaxPrice] = useState(60);
  const [packageSize, setPackageSize] = useState("2kg");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(12); // ✅ теперь это состояние

  useEffect(() => {
    fetchProducts(currentPage, limit);
    fetchCategoryName();
    window.scrollTo(0, 0);
  }, [id, currentPage, limit]); // ✅ следим и за limit

  const fetchProducts = async (page = 1, limitValue = limit) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${id}&page=${page}&limit=${limitValue}`
      );

      setProducts(res.data.products);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.totalProducts);
    } catch (error) {
      console.error("❌ Ошибка при загрузке продуктов:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
      setCategoryName(res.data.name);
    } catch (error) {
      console.error("Ошибка при загрузке категории:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ обработчик смены количества товаров
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // сбрасываем на первую страницу
  };

  return (
    <div className="catalog-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: categoryName || "Категория" }]} />

      <section className="catalog">
        <div className="catalog__container">
          {/* ---------- ЛЕВАЯ КОЛОНКА ---------- */}
          <aside className="catalog__filters">
            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Цена</h3>
              <div className="catalog__price-range">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div className="catalog__price-values">
                  <span>{minPrice} €</span> — <span>{maxPrice} €</span>
                </div>
              </div>
            </div>

            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Производители</h3>
              <ul className="catalog__checkbox-list">
                {["VanCat", "Beef", "TunaFish"].map((brand) => (
                  <li key={brand}>
                    <label>
                      <input type="checkbox" /> {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Размер упаковки</h3>
              <ul className="catalog__checkbox-list">
                {["2 kg", "3 kg", "5 kg", "10 kg"].map((size) => (
                  <li key={size}>
                    <label>
                      <input
                        type="checkbox"
                        checked={packageSize === size}
                        onChange={() => setPackageSize(size)}
                      />{" "}
                      {size}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ---------- ПРАВАЯ КОЛОНКА ---------- */}
          <div className="catalog__content">
            <div className="catalog__controls">
              <div className="catalog__view-buttons">
                <button className="catalog__view-btn active">▦</button>
                <button className="catalog__view-btn">☰</button>
              </div>
              <div className="catalog__sort">
                <label>Сортировка:</label>
                <select>
                  <option>По умолчанию</option>
                  <option>По возрастанию цены</option>
                  <option>По убыванию цены</option>
                </select>
              </div>

              {/* ✅ теперь select реально работает */}
              <div className="catalog__show-count">
                <label>Показать:</label>
                <select value={limit} onChange={handleLimitChange}>
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
              </div>
            </div>

            <div className="catalog__grid">
              {loading ? (
                <p>Загрузка...</p>
              ) : products.length === 0 ? (
                <p>Товары отсутствуют</p>
              ) : (
                products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="catalog__card"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="catalog__card-image-wrapper">
                      {(product.tag?.trim() || product.label?.trim()) && (
                        <div className="catalog__card-labels">
                          {product.tag?.trim() && (
                            <span className="catalog__label catalog__label--hit">
                              {product.tag}
                            </span>
                          )}
                          {product.label?.trim() && (
                            <span className="catalog__label catalog__label--new">
                              {product.label}
                            </span>
                          )}
                        </div>
                      )}

                      <img
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : `http://localhost:5000${product.image}`
                        }
                        alt={product.name}
                        className="catalog__card-image"
                      />
                    </div>

                    <h3 className="catalog__card-title">{product.name}</h3>

                    <div className="catalog__card-prices">
                      <span className="catalog__price">
                        {product.price} грн
                      </span>
                      {product.oldPrice > 0 && (
                        <span className="catalog__old-price">
                          {product.oldPrice} грн
                        </span>
                      )}
                    </div>

                    <div className="catalog__card-actions">
                      <div className="catalog__quantity">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                      <button className="catalog__cart-btn">В корзину</button>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* ✅ Пагинация */}
            <div className="catalog__pagination">
              <div className="catalog__pagination-pages">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={page === currentPage ? "active" : ""}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>

              <div className="catalog__pagination-info">
                Показано {products.length} из {totalProducts}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default CategoryProducts;
