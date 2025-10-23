import graphicIcon from '../assets/icons/graphic-elements.svg'
import product1 from '../assets/images/products/product.png'
import product2 from '../assets/images/products/product2.png'
import product3 from '../assets/images/products/product3.png'
import product4 from '../assets/images/products/product4.png'
import product5 from '../assets/images/products/product5.png'
import product6 from '../assets/images/products/product6.png'
import product7 from '../assets/images/products/product7.png'
import product8 from '../assets/images/products/product8.png'

function PopularProducts() {
  const products = [
    {
      id: 1,
      title: 'Корм для собак Organic egg layer pellets',
      price: '2.55€',
      oldPrice: '2.55€',
      image: product1,
      tag: 'Хит',
      label: 'Новинка',
    },
    {
      id: 2,
      title: 'Корм для кошек KMR Pwdr 12oz',
      price: '2.45€',
      oldPrice: '3.45€',
      image: product2,
      tag: 'Хит',
      label: 'Новинка',
    },
    {
      id: 3,
      title: 'Корм для собак tripett Single animal protein',
      price: '3€',
      oldPrice: '3.22€',
      image: product3,
      tag: 'Хит',
    },
    {
      id: 4,
      title: 'Корм для собак Green Papaya Fruit',
      price: '3.12€',
      image: product4,
      tag: 'Хит',
    },
    {
      id: 5,
      title: 'Корм для собак James Wellbeloved',
      price: '2.55€',
      oldPrice: '2.55€',
      image: product5,
    },
    {
      id: 6,
      title: 'Корм для собак purina beyond',
      price: '2.55€',
      oldPrice: '2.55€',
      image: product6,
    },
    {
      id: 7,
      title: 'Корм для кошек Norwegian Tuna Fish',
      price: '2.55€',
      image: product7,
      label: 'Новинка',
    },
    {
      id: 8,
      title: 'Корм для кошек Catfish Natural ingredients',
      price: '2.55€',
      oldPrice: '2.55€',
      image: product8,
      tag: 'Хит',
    },
  ]

  return (
    <section className="popular">
      <div className="popular__container">
        <div className="popular__header">
          <img src={graphicIcon} alt="icon" className="popular__icon" />
          <h2 className="popular__title">Хиты продаж</h2>
        </div>

        <div className="popular__products">
          {products.map((product) => (
            <div key={product.id} className="popular__products-card">
              <div className="popular__products-image-wrapper">
                <div className="popular__products-labels">
                  {product.tag && <span className="popular__products-label popular__products-label--hit">{product.tag}</span>}
                  {product.label && <span className="popular__products-label popular__products-label--new">{product.label}</span>}
                </div>
                <img src={product.image} alt={product.title} className="popular__products-image" />
              </div>

              <div className="popular__products-info">
                <h3 className="popular__products-name">{product.title}</h3>

                <div className="popular__products-prices">
                  <span className="popular__products-price">{product.price}</span>
                  {product.oldPrice && <span className="popular__products-old-price">{product.oldPrice}</span>}
                </div>

                <div className="popular__products-actions">
                  <div className="popular__products-quantity">
                    <button className="popular__products-btn">-</button>
                    <span className="popular__products-count">2</span>
                    <button className="popular__products-btn">+</button>
                  </div>
                  <button className="popular__products-cart-btn">В корзину</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularProducts
