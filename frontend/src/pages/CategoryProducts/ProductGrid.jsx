import { Link } from "react-router-dom";

export default function ProductGrid({ products, loading }) {
  if (loading) return <p>Загрузка...</p>;
  if (products.length === 0) return <p>Товары отсутствуют</p>;

  return (
    <div className="catalog__grid">
      {products.map((product) => (
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
            <span className="catalog__price">{product.price} €</span>
            {product.oldPrice > 0 && (
              <span className="catalog__old-price">{product.oldPrice} €</span>
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
      ))}
    </div>
  );
}
