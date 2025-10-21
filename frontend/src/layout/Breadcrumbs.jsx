import { Link } from "react-router-dom";
import homeIcon from "../assets/icons/home.svg";
import arrowIcon from "../assets/icons/arrow-right.svg";

function Breadcrumbs({ items = [] }) {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <div className="breadcrumbs__items">
          {/* Главная */}
          <div className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              <img
                src={homeIcon}
                alt="На главную"
                className="breadcrumbs__icon breadcrumbs__icon--home"
              />
            </Link>
          </div>

          {/* Промежуточные элементы */}
          {items.map((item, index) => (
            <div key={index} className="breadcrumbs__item-group">
              <img
                src={arrowIcon}
                alt="→"
                className="breadcrumbs__icon breadcrumbs__icon--arrow"
              />

              {item.path ? (
                <Link to={item.path} className="breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs__text">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Breadcrumbs;
