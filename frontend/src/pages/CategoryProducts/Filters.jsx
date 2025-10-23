import { useEffect, useState } from "react";
import axios from "axios";

export default function Filters({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  packageSize,
  setPackageSize,
  selectedManufacturers,
  setSelectedManufacturers,
  onFilterChange,
}) {
  const [manufacturers, setManufacturers] = useState([]);

  // 🧩 Загружаем список уникальных производителей
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const unique = [
          ...new Set(
            res.data.products.map((p) => p.manufacturer?.trim()).filter(Boolean)
          ),
        ];
        setManufacturers(unique);
      } catch (error) {
        console.error("Ошибка при загрузке производителей:", error);
      }
    };
    fetchManufacturers();
  }, []);

  // 🧩 Обработчик выбора производителя
  const handleManufacturerChange = (brand) => {
    const updated = selectedManufacturers.includes(brand)
      ? selectedManufacturers.filter((b) => b !== brand)
      : [...selectedManufacturers, brand];

    setSelectedManufacturers(updated);
    onFilterChange({ manufacturer: updated });
  };

  // 🧩 Обработчик выбора упаковки (множественный выбор)
  const handlePackageChange = (size) => {
    const normalized = size.replace(/\s+/g, "").toLowerCase();
    const updated = packageSize.includes(normalized)
      ? packageSize.filter((s) => s !== normalized)
      : [...packageSize, normalized];

    setPackageSize(updated);
    onFilterChange({ packageSize: updated });
  };

  // 🧩 Обновление диапазона цены
  const handlePriceChange = () => {
    onFilterChange({ minPrice, maxPrice });
  };

  return (
    <aside className="catalog__filters">
      {/* Цена */}
      <div className="catalog__filter">
        <h3 className="catalog__filter-title">Цена</h3>
        <div className="catalog__price-range">
          <input
            type="range"
            min="0"
            max="1000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onMouseUp={handlePriceChange}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onMouseUp={handlePriceChange}
          />
          <div className="catalog__price-values">
            <span>{minPrice} €</span> — <span>{maxPrice} €</span>
          </div>
        </div>
      </div>

      {/* Производители */}
      <div className="catalog__filter">
        <h3 className="catalog__filter-title">Производители</h3>
        <ul className="catalog__checkbox-list">
          {manufacturers.length > 0 ? (
            manufacturers.map((brand) => (
              <li key={brand}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedManufacturers.includes(brand)}
                    onChange={() => handleManufacturerChange(brand)}
                  />{" "}
                  {brand}
                </label>
              </li>
            ))
          ) : (
            <li>Загрузка...</li>
          )}
        </ul>
      </div>

      {/* Размер упаковки */}
      <div className="catalog__filter">
        <h3 className="catalog__filter-title">Размер упаковки</h3>
        <ul className="catalog__checkbox-list">
          {["2kg", "3kg", "5kg", "10kg"].map((size) => (
            <li key={size}>
              <label>
                <input
                  type="checkbox"
                  checked={packageSize.includes(size)}
                  onChange={() => handlePackageChange(size)}
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
