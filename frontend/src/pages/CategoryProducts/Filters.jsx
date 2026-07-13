import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        const res = await axios.get(`${API_URL}/api/products`);
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

  // 🧩 Производители
  const handleManufacturerChange = (brand) => {
    const updated = selectedManufacturers.includes(brand)
      ? selectedManufacturers.filter((b) => b !== brand)
      : [...selectedManufacturers, brand];

    setSelectedManufacturers(updated);
    onFilterChange({ manufacturer: updated });
  };

  // 🧩 Размер упаковки
  const handlePackageChange = (size) => {
    const normalized = size.replace(/\s+/g, "").toLowerCase();
    const updated = packageSize.includes(normalized)
      ? packageSize.filter((s) => s !== normalized)
      : [...packageSize, normalized];

    setPackageSize(updated);
    onFilterChange({ packageSize: updated });
  };

  // 🧩 Цена (гарантируем корректный диапазон)
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    const safeValue = Math.min(value, maxPrice - 1); // не даём пересечь max
    setMinPrice(safeValue);
    onFilterChange({ minPrice: safeValue, maxPrice });
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    const safeValue = Math.max(value, minPrice + 1); // не даём пересечь min
    setMaxPrice(safeValue);
    onFilterChange({ minPrice, maxPrice: safeValue });
  };

  return (
    <aside className="category__filters">
      {/* 🔹 Цена */}
      <div className="category__filter">
        <h3 className="category__filter-title">Цена</h3>
        <div className="category__price-range">
          {/* Ползунки */}
          <div className="category__sliders">
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>

          {/* Отображение значений */}
          <div className="category__price-values">
            <span>{minPrice} €</span> — <span>{maxPrice} €</span>
          </div>
        </div>
      </div>

      {/* 🔹 Производители */}
      <div className="category__filter">
        <h3 className="category__filter-title">Производители</h3>
        <ul className="category__checkbox-list">
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

      {/* 🔹 Размер упаковки */}
      <div className="category__filter">
        <h3 className="category__filter-title">Размер упаковки</h3>
        <ul className="category__checkbox-list">
          {["2kg", "3kg", "5kg", "10kg"].map((size) => (
            <li key={size}>
              <label>
                <input
                  type="checkbox"
                  checked={packageSize.includes(size.toLowerCase())}
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
