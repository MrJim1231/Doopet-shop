export default function Filters({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  packageSize,
  setPackageSize,
}) {
  return (
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
  );
}
