import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = (categoryId, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts(currentPage, limit, sort, filters);
    fetchCategoryName();
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, limit, sort, filters]);

  // 🔹 Формирование строки запроса
  const buildQuery = (page, limitValue, sortValue, filtersObj) => {
    const params = new URLSearchParams();

    if (categoryId) params.append("category", categoryId);
    params.append("page", page);
    params.append("limit", limitValue);
    params.append("sort", sortValue);

    if (filtersObj.minPrice) params.append("minPrice", filtersObj.minPrice);
    if (filtersObj.maxPrice) params.append("maxPrice", filtersObj.maxPrice);
    if (filtersObj.packageSize)
      params.append("packageSize", filtersObj.packageSize);
    if (filtersObj.manufacturer && filtersObj.manufacturer.length)
      params.append("manufacturer", filtersObj.manufacturer.join(","));

    return params.toString();
  };

  // 🔹 Получение продуктов
  const fetchProducts = async (
    page = 1,
    limitValue = limit,
    sortValue = sort,
    filtersObj = filters
  ) => {
    try {
      setLoading(true);
      const query = buildQuery(page, limitValue, sortValue, filtersObj);
      const res = await axios.get(
        `http://localhost:5000/api/products?${query}`
      );

      setProducts(res.data.products);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.totalProducts);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Получение имени категории
  const fetchCategoryName = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/categories/${categoryId}`
      );
      setCategoryName(res.data.name);
    } catch (error) {
      console.error("Ошибка при загрузке категории:", error);
    }
  };

  return {
    products,
    categoryName,
    loading,
    currentPage,
    totalPages,
    totalProducts,
    limit,
    setLimit,
    sort,
    setSort,
    setCurrentPage,
  };
};
