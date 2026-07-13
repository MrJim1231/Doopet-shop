import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import placeholderImg from "../../assets/images/no-image.png";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API_URL}/api/favorites/${user._id}`
        );
        setFavorites(res.data || []);
      } catch (err) {
        console.error("Ошибка при загрузке избранного:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (productId) => {
    if (!user) return;

    try {
      await axios.post(`${API_URL}/api/favorites`, {
        userId: user._id,
        productId,
      });
      setFavorites((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
    }
  };

  return (
    <div className="favorites-page">
      {/* <Header /> */}
      {/* <Breadcrumbs items={[{ label: "Закладки" }]} /> */}

      <section className="favorites">
        <div className="favorites__container">
          {/* <SectionHeader
            icon={graphicIcon}
            title="Закладки"
            baseClass="favorites__header"
          /> */}

          {loading ? (
            <p>Загрузка...</p>
          ) : !user ? (
            <p className="favorites__auth-message">
              Чтобы просмотреть закладки, пожалуйста, авторизуйтесь.
            </p>
          ) : favorites.length === 0 ? (
            <p className="favorites__empty">
              У вас пока нет избранных товаров 💔
            </p>
          ) : (
            <div className="favorites__grid">
              {favorites.map((item) => {
                const product = item.productId;
                if (!product) return null;

                return (
                  <div key={product._id} className="favorites__item">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : `${API_URL}${product.image}`
                        }
                        alt={product.name}
                        onError={(e) => (e.target.src = placeholderImg)}
                        className="favorites__img"
                      />
                    </Link>
                    <div className="favorites__info">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="favorites__name">{product.name}</h3>
                      </Link>
                      <p className="favorites__price">{product.price} €</p>
                      <button
                        onClick={() => handleRemoveFavorite(product._id)}
                        className="favorites__remove-btn"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* <SubscribeSection /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Favorites;
