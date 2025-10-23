function SortSelect({ sort, setSort }) {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="catalog__sort">
      <label>Сортировка:</label>
      <select value={sort} onChange={handleSortChange}>
        <option value="default">По умолчанию</option>
        <option value="price_asc">По возрастанию цены</option>
        <option value="price_desc">По убыванию цены</option>
        <option value="name_asc">По названию (А–Я)</option>
        <option value="name_desc">По названию (Я–А)</option>
      </select>
    </div>
  );
}

export default SortSelect;
