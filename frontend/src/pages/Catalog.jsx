import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import HeaderTopBar from '../layout/HeaderTopBar'
import Header from '../layout/Header'
import Breadcrumbs from '../layout/Breadcrumbs'
import CatalogBlock from '../layout/CatalogBlock'
import SubscribeSection from '../components/SubscribeSection'
import Footer from '../layout/Footer'

function Catalog() {
  const [minPrice, setMinPrice] = useState(15)
  const [maxPrice, setMaxPrice] = useState(60)
  const [packageSize, setPackageSize] = useState('2kg')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    // Прокручиваем страницу вверх при переходе
    window.scrollTo(0, 0)
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:5000/api/products')

      console.log('📦 Ответ сервера (всё):', res) // Полный ответ (заголовки, статус и т.д.)
      console.log('📦 Полученные продукты:', res.data) // Только массив продуктов

      // Если хочешь посмотреть каждый продукт по отдельности:
      if (Array.isArray(res.data)) {
        res.data.forEach((item, index) => {
          console.log(`🧩 Продукт #${index + 1}:`, item)
        })
      }

      setProducts(res.data)
    } catch (error) {
      console.error('❌ Ошибка при загрузке продуктов:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="catalog-page">
      <HeaderTopBar />
      <Header />
      <CatalogBlock />
      <Breadcrumbs items={[{ label: 'Корм для собак' }]} />

      <section className="catalog">
        <div className="catalog__container">
          {/* ---------- ЛЕВАЯ КОЛОНКА ---------- */}
          <aside className="catalog__filters">
            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Цена</h3>
              <div className="catalog__price-range">
                <input type="range" min="0" max="100" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="range" min="0" max="100" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <div className="catalog__price-values">
                  <span>{minPrice} €</span> — <span>{maxPrice} €</span>
                </div>
              </div>
            </div>

            <div className="catalog__filter">
              <h3 className="catalog__filter-title">Производители</h3>
              <ul className="catalog__checkbox-list">
                {['VanCat', 'Beef', 'TunaFish'].map((brand) => (
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
                {['2 kg', '3 kg', '5 kg', '10 kg'].map((size) => (
                  <li key={size}>
                    <label>
                      <input type="checkbox" checked={packageSize === size} onChange={() => setPackageSize(size)} /> {size}
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
              <div className="catalog__show-count">
                <label>Показать:</label>
                <select>
                  <option>12</option>
                  <option>24</option>
                  <option>48</option>
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
                  <Link key={product._id} to={`/product/${product._id}`} className="catalog__card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="catalog__card-image-wrapper">
                      {/* ✅ Лейблы товара */}
                      {(product.tag?.trim() || product.label?.trim()) && (
                        <div className="catalog__card-labels">
                          {product.tag?.trim() && <span className="catalog__label catalog__label--hit">{product.tag}</span>}
                          {product.label?.trim() && <span className="catalog__label catalog__label--new">{product.label}</span>}
                        </div>
                      )}

                      <img src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} className="catalog__card-image" />
                    </div>

                    <h3 className="catalog__card-title">{product.name}</h3>

                    <div className="catalog__card-prices">
                      <span className="catalog__price">{product.price} грн</span>
                      {product.oldPrice > 0 && <span className="catalog__old-price">{product.oldPrice} грн</span>}
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

            <div className="catalog__pagination">
              <div className="catalog__pagination-pages">
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>&lt;</button>
                <button>&gt;</button>
              </div>
              <div className="catalog__pagination-info">
                Показано с 1 по {products.length} из {products.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default Catalog
