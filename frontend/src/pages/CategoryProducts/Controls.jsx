import SortSelect from "./SortSelect";

export default function Controls({
  limit,
  setLimit,
  setCurrentPage,
  sort,
  setSort,
}) {
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="category__controls">
      <div className="category__view-buttons">
        <button className="category__view-btn active">▦</button>
        <button className="category__view-btn">☰</button>
      </div>

      {/* ✅ сортировка вынесена в отдельный компонент */}
      <SortSelect sort={sort} setSort={setSort} />

      <div className="category__show-count">
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
