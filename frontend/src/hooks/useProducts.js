import { useState, useEffect } from "react";
import axios from "axios";

export function useProducts(categoryId) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    if (!categoryId) return;
    fetchProducts(currentPage, limit);
    fetchCategoryName();
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, limit]);

  const fetchProducts = async (page = 1, limitValue = limit) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${categoryId}&page=${page}&limit=${limitValue}`
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
    setCurrentPage,
  };
}
