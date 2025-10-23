export default function Controls({ limit, setLimit, setCurrentPage }) {
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
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
        <select value={limit} onChange={handleLimitChange}>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>
    </div>
  );
}
